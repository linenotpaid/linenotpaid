import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const BLOCK_THRESHOLD = 3
const BLOCK_DURATION_DAYS = 14

Deno.serve(async () => {
  try {
    const now = new Date().toISOString()

    const { data: noShows, error } = await supabase
      .from('attendees')
      .select('user_id, events!inner(end_time)')
      .eq('no_show_processed', false)
      .is('checked_in_at', null)
      .lt('events.end_time', now)

    if (error) throw error
    if (!noShows?.length) {
      return new Response(JSON.stringify({ processed: 0 }), { status: 200 })
    }

    const userMap = new Map()
    for (const row of noShows) {
      userMap.set(row.user_id, (userMap.get(row.user_id) ?? 0) + 1)
    }

    const results = { blocked: 0, incremented: 0, errors: 0 }

    for (const [userId, count] of userMap) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('no_show_count')
        .eq('id', userId)
        .single()

      const currentCount = (profile?.no_show_count ?? 0) + count
      const shouldBlock = currentCount >= BLOCK_THRESHOLD

      const blockExpiry = new Date()
      blockExpiry.setDate(blockExpiry.getDate() + BLOCK_DURATION_DAYS)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          no_show_count: currentCount,
          ...(shouldBlock && {
            blocked: true,
            block_expires_at: blockExpiry.toISOString(),
          })
        })
        .eq('id', userId)

      if (updateError) {
        results.errors++
        continue
      }

      await supabase
        .from('attendees')
        .update({ no_show_processed: true })
        .eq('user_id', userId)
        .eq('no_show_processed', false)

      if (shouldBlock) {
        results.blocked++
        await sendBlockNotification(userId, blockExpiry)
      } else {
        results.incremented++
      }
    }

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})

async function sendBlockNotification(userId, expiresAt) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('expo_push_token')
    .eq('id', userId)
    .single()

  if (!profile?.expo_push_token) return

  const expiryStr = expiresAt.toLocaleDateString('ar-SA')

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: profile.expo_push_token,
      title: '⚠️ تم تعليق حسابك',
      body: `تم تعليق حسابك بسبب التغيب المتكرر. سيتم رفع التعليق تلقائياً في ${expiryStr}`,
      data: { type: 'account_blocked' },
    })
  })
}
