'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminEventsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchEvents() }, [])

  async function fetchEvents() {
    const { data } = await supabase.from('events').select('*, attendees(count)').order('created_at', { ascending: false })
    if (data) setEvents(data)
    setLoading(false)
  }

  async function approve(id: string) {
    await supabase.from('events').update({ status: 'published' }).eq('id', id)
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'published' } : e))
  }

  async function reject(id: string) {
    await supabase.from('events').update({ status: 'rejected' }).eq('id', id)
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' } : e))
  }

  const filtered = filter === 'all' ? events : events.filter(e => e.status === filter)
  const statusColor: any = { published: '#10B981', draft: '#F59E0B', rejected: '#EF4444' }
  const statusLabel: any = { published: 'منشورة', draft: 'مسودة', rejected: 'مرفوضة' }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', fontFamily: 'system-ui', direction: 'rtl' }}>
      <div style={{ background: '#060607', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #27272A' }}>
        <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>إدارة الفعاليات</h1>
        <span style={{ background: '#27272A', color: '#888', borderRadius: 20, padding: '2px 10px', fontSize: 13 }}>{events.length}</span>
      </div>
      <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[['all','الكل'],['draft','مسودة'],['published','منشورة'],['rejected','مرفوضة']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: filter === val ? '#2B7FFF' : '#18181B', color: filter === val ? '#fff' : '#888' }}>{label}</button>
          ))}
        </div>
        {loading && <p style={{ textAlign: 'center', color: '#666' }}>جاري التحميل...</p>}
        {filtered.map(event => (
          <div key={event.id} style={{ background: '#18181B', borderRadius: 16, padding: 20, marginBottom: 12, border: '1px solid #27272A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px', color: '#fff' }}>{event.title}</h2>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{event.description}</p>
              </div>
              <span style={{ background: statusColor[event.status] + '20', color: statusColor[event.status], borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                {statusLabel[event.status] || event.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16, background: '#0F0F0F', borderRadius: 10, padding: 12 }}>
              {[['الموقع', event.location],['المقاعد', event.capacity],['الحضور', event.attendees?.[0]?.count || 0],['الأرباح', (event.price_points || 0) + ' ريال']].map(([label, val]) => (
                <div key={label}><div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{val || '—'}</div></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {event.status === 'draft' && <>
                <button onClick={() => approve(event.id)} style={{ flex: 1, background: '#0A2A1A', color: '#10B981', border: '1px solid #166534', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>✅ موافقة ونشر</button>
                <button onClick={() => reject(event.id)} style={{ flex: 1, background: '#1C0A0A', color: '#EF4444', border: '1px solid #450A0A', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>❌ رفض</button>
              </>}
              {event.status === 'published' && (
                <button onClick={() => reject(event.id)} style={{ background: '#1C0A0A', color: '#EF4444', border: '1px solid #450A0A', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>إيقاف</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
