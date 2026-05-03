'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ScannerSessionsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [label, setLabel] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .eq('merchant_id', user.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (eventsData) setEvents(eventsData)

    const { data: sessionsData } = await supabase
      .from('scan_sessions')
      .select('*, events(title)')
      .eq('merchant_id', user.id)
      .order('created_at', { ascending: false })
    if (sessionsData) setSessions(sessionsData)
  }

  async function createSession() {
    if (!selectedEvent) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const token = Math.random().toString(36).substring(2, 10).toUpperCase()
      const { data } = await supabase.from('scan_sessions').insert({
        event_id: selectedEvent,
        merchant_id: user.id,
        token,
        label: label || 'المدخل الرئيسي',
        is_active: true,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      }).select().single()

      if (data) {
        setSessions(prev => [data, ...prev])
        setLabel('')
      }
    } finally {
      setLoading(false)
    }
  }

  async function toggleSession(id: string, isActive: boolean) {
    await supabase.from('scan_sessions').update({ is_active: !isActive }).eq('id', id)
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_active: !isActive } : s))
  }

  const scanUrl = (token: string) => `${window.location.origin}/scan/${token}`

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'system-ui', direction: 'rtl' }}>
      {/* Header */}
      <div style={{ background: '#0A0A0A', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.push('/merchant')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>جلسات مسح QR</h1>
      </div>

      <div style={{ maxWidth: 700, margin: '24px auto', padding: '0 16px' }}>

        {/* إنشاء جلسة جديدة */}
        <div style={card}>
          <h2 style={cardTitle}>إنشاء جلسة مسح جديدة</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>الفعالية *</label>
            <select style={inp} value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)}>
              <option value="">اختر الفعالية</option>
              {events.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>اسم البوابة / المدخل</label>
            <input style={inp} value={label} onChange={e => setLabel(e.target.value)} placeholder="مثال: مدخل A، البوابة الرئيسية" />
          </div>
          <button onClick={createSession} disabled={loading || !selectedEvent} style={{ width: '100%', background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: loading || !selectedEvent ? 0.6 : 1 }}>
            {loading ? 'جاري الإنشاء...' : '+ إنشاء جلسة مسح'}
          </button>
        </div>

        {/* الجلسات الموجودة */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0A0A0A', marginBottom: 16 }}>الجلسات النشطة</h2>

        {sessions.length === 0 ? (
          <div style={{ ...card, textAlign: 'center', padding: 40 }}>
            <p style={{ fontSize: 32, margin: '0 0 12px' }}>📡</p>
            <p style={{ color: '#666' }}>لا توجد جلسات بعد</p>
          </div>
        ) : (
          sessions.map(session => (
            <div key={session.id} style={{ ...card, opacity: session.is_active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleSession(session.id, session.is_active)} style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: session.is_active ? '#DCFCE7' : '#FEE2E2', color: session.is_active ? '#22C55E' : '#EF4444' }}>
                    {session.is_active ? '● نشط' : '○ موقوف'}
                  </button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0A0A0A' }}>{session.label}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#2B7FFF' }}>🎯 {session.events?.title}</p>
                </div>
              </div>

              {/* Stats */}
              <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#666' }}>عمليات المسح</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#0A0A0A' }}>{session.scans_count}</span>
              </div>

              {/* رابط المسح */}
              {session.is_active && (
                <div>
                  <p style={{ fontSize: 13, color: '#444', marginBottom: 8, textAlign: 'right', fontWeight: 600 }}>رابط المسح — شاركه مع موظفيك:</p>
                  <div style={{ background: '#EEF4FF', borderRadius: 10, padding: 12, marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#2B7FFF', wordBreak: 'break-all', textAlign: 'left', direction: 'ltr' }}>
                      {typeof window !== 'undefined' ? scanUrl(session.token) : ''}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => navigator.clipboard.writeText(scanUrl(session.token))} style={{ flex: 1, background: '#2B7FFF', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      📋 نسخ الرابط
                    </button>
                    <button onClick={() => window.open(scanUrl(session.token), '_blank')} style={{ flex: 1, background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      🔗 فتح الماسح
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const card: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #EBEBEB' }
const cardTitle: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 20, marginTop: 0 }
const lbl: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }
const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #EBEBEB', fontSize: 14, color: '#0A0A0A', background: '#FAFAF7', boxSizing: 'border-box', direction: 'rtl' }
