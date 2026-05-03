'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Proof = {
  id: string
  status: string
  proof_url: string
  proof_status: string
  proof_submitted_at: string
  admin_notes: string
  profiles: { full_name: string; email: string }
  events: { title: string; conditions: string; condition_type: string }
}

export default function ProofsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [proofs, setProofs] = useState<Proof[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [note, setNote] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => { fetchProofs() }, [filter])

  async function fetchProofs() {
    setLoading(true)
    const { data } = await supabase
      .from('attendees')
      .select('*, profiles(full_name, email), events(title, conditions, condition_type)')
      .not('proof_url', 'is', null)
      .eq('proof_status', filter)
      .order('proof_submitted_at', { ascending: false })
    if (data) setProofs(data as any)
    setLoading(false)
  }

  async function updateProof(id: string, status: 'approved' | 'rejected') {
    await supabase.from('attendees').update({
      proof_status: status,
      admin_notes: note,
      points_earned: status === 'approved' ? 50 : 0,
    }).eq('id', id)
    setSelected(null)
    setNote('')
    fetchProofs()
  }

  const filters = [
    { key: 'pending', label: 'قيد المراجعة', color: '#F5A623' },
    { key: 'approved', label: 'مقبول', color: '#22C55E' },
    { key: 'rejected', label: 'مرفوض', color: '#EF4444' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'system-ui', direction: 'rtl' }}>
      {/* Header */}
      <div style={{ background: '#0A0A0A', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>مراجعة الإثباتات</h1>
        <div style={{ marginRight: 'auto', background: '#F5A623', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>
          {proofs.length} إثبات
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 24px', borderBottom: '1px solid #EBEBEB', background: '#fff' }}>
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
            background: filter === f.key ? f.color : '#F5F5F5',
            color: filter === f.key ? '#fff' : '#666',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
        {loading ? (
          <div style={emptyStyle}><p>جاري التحميل...</p></div>
        ) : proofs.length === 0 ? (
          <div style={emptyStyle}>
            <p style={{ fontSize: 40, margin: 0 }}>📭</p>
            <p style={{ color: '#666' }}>لا توجد إثباتات {filter === 'pending' ? 'قيد المراجعة' : filter === 'approved' ? 'مقبولة' : 'مرفوضة'}</p>
          </div>
        ) : (
          proofs.map(proof => (
            <div key={proof.id} style={card}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: '#888' }}>{new Date(proof.proof_submitted_at).toLocaleString('ar')}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0A0A0A' }}>{proof.profiles?.full_name}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{proof.profiles?.email}</p>
                </div>
              </div>

              {/* Event Info */}
              <div style={{ background: '#EEF4FF', borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#2B7FFF', textAlign: 'right' }}>🎯 {proof.events?.title}</p>
                {proof.events?.conditions && (
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: '#444', textAlign: 'right' }}>الشرط: {proof.events.conditions}</p>
                )}
              </div>

              {/* Proof Image */}
              {proof.proof_url && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#444', textAlign: 'right' }}>الإثبات المرفوع:</p>
                  <img src={proof.proof_url} alt="إثبات" style={{ width: '100%', borderRadius: 12, border: '1px solid #EBEBEB', maxHeight: 300, objectFit: 'cover' }} />
                  <a href={proof.proof_url} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: 8, color: '#2B7FFF', fontSize: 13 }}>فتح الصورة كاملة ↗</a>
                </div>
              )}

              {/* Actions */}
              {filter === 'pending' && (
                <div>
                  {selected === proof.id ? (
                    <div>
                      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="ملاحظة للعميل (اختياري)..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #EBEBEB', fontSize: 14, marginBottom: 12, boxSizing: 'border-box', direction: 'rtl', resize: 'vertical', minHeight: 80 }} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => updateProof(proof.id, 'approved')} style={{ flex: 1, background: '#22C55E', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>✅ قبول وإضافة النقاط</button>
                        <button onClick={() => updateProof(proof.id, 'rejected')} style={{ flex: 1, background: '#EF4444', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>❌ رفض</button>
                        <button onClick={() => setSelected(null)} style={{ padding: '12px 16px', background: '#F5F5F5', border: 'none', borderRadius: 10, cursor: 'pointer', color: '#666' }}>إلغاء</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setSelected(proof.id)} style={{ width: '100%', background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                      مراجعة الإثبات
                    </button>
                  )}
                </div>
              )}

              {/* Status Badge */}
              {filter !== 'pending' && (
                <div style={{ textAlign: 'center', padding: '10px', borderRadius: 10, background: filter === 'approved' ? '#DCFCE7' : '#FEE2E2' }}>
                  <span style={{ color: filter === 'approved' ? '#22C55E' : '#EF4444', fontWeight: 700, fontSize: 14 }}>
                    {filter === 'approved' ? '✅ تم القبول وإضافة النقاط' : '❌ تم الرفض'}
                  </span>
                  {proof.admin_notes && <p style={{ margin: '6px 0 0', fontSize: 13, color: '#666' }}>{proof.admin_notes}</p>}
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
const emptyStyle: React.CSSProperties = { textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB' }
