'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function MerchantEventsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchEvents() }, [])

  async function fetchEvents() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }
    const { data } = await supabase.from('events').select('*, attendees(count)').eq('merchant_id', user.id).order('created_at', { ascending: false })
    if (data) setEvents(data)
    setLoading(false)
  }

  const statusColor: any = { published: '#10B981', draft: '#F59E0B', rejected: '#EF4444' }
  const statusLabel: any = { published: 'منشورة', draft: 'مسودة', rejected: 'مرفوضة' }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'system-ui', direction: 'rtl' }}>
      <div style={{ background: '#0A0A0A', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.push('/merchant')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>فعالياتي</h1>
        <button onClick={() => router.push('/merchant/new-event')} style={{ marginRight: 'auto', background: '#2B7FFF', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>+ فعالية جديدة</button>
      </div>
      <div style={{ maxWidth: 900, margin: '32px auto', padding: '0 16px' }}>
        {loading && <p style={{ textAlign: 'center', color: '#999' }}>جاري التحميل...</p>}
        {!loading && events.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: '#999' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <p>لا توجد فعاليات بعد</p>
            <button onClick={() => router.push('/merchant/new-event')} style={{ marginTop: 16, background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>أنشئ فعالية الآن</button>
          </div>
        )}
        {events.map(event => (
          <div key={event.id} style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 12, border: '1px solid #EBEBEB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>{event.title}</h2>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{event.location || 'بدون موقع'}</p>
              </div>
              <span style={{ background: statusColor[event.status] + '20', color: statusColor[event.status], borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                {statusLabel[event.status] || event.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16, background: '#FAFAF7', borderRadius: 10, padding: 12 }}>
              {[['التاريخ', event.event_date],['المقاعد', event.capacity],['الحضور', event.attendees?.[0]?.count || 0],['الأرباح', (event.price_points || 0) + ' ريال']].map(([label, val]) => (
                <div key={label}><div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{val || '—'}</div></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => router.push(`/merchant/scanner?event=${event.id}`)} style={{ flex: 1, background: '#F0F8FF', color: '#2B7FFF', border: '1px solid #C7DCFF', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>📡 ماسح QR</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
