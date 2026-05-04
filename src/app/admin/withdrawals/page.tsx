'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminWithdrawalsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => { fetchRequests() }, [])

  async function fetchRequests() {
    const { data } = await supabase
      .from('withdrawal_requests')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false })
    if (data) setRequests(data)
    setLoading(false)
  }

  async function approve(id: string, userId: string, amount: number) {
    await supabase.from('withdrawal_requests').update({ status: 'paid', processed_at: new Date().toISOString() }).eq('id', id)
    await supabase.from('profiles').update({ earnings: 0 }).eq('id', userId)
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'paid' } : r))
  }

  async function reject(id: string) {
    await supabase.from('withdrawal_requests').update({ status: 'rejected', processed_at: new Date().toISOString() }).eq('id', id)
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)
  const statusColor: any = { pending: '#F59E0B', paid: '#10B981', rejected: '#EF4444', approved: '#2B7FFF' }
  const statusLabel: any = { pending: 'قيد المراجعة', paid: 'تم التحويل', rejected: 'مرفوض', approved: 'موافق عليه' }

  const totalPending = requests.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', fontFamily: 'system-ui', direction: 'rtl' }}>
      <div style={{ background: '#060607', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #27272A' }}>
        <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>طلبات السحب</h1>
        <span style={{ background: '#27272A', color: '#888', borderRadius: 20, padding: '2px 10px', fontSize: 13 }}>{requests.filter(r => r.status === 'pending').length} معلق</span>
      </div>

      <div style={{ maxWidth: 900, margin: '32px auto', padding: '0 16px' }}>
        {/* إجمالي المعلق */}
        <div style={{ background: '#18181B', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid #27272A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>إجمالي المبالغ المعلقة</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F59E0B' }}>{totalPending} ريال</div>
          </div>
          <div style={{ fontSize: 40 }}>💸</div>
        </div>

        {/* فلتر */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[['pending','معلقة'],['paid','تم التحويل'],['rejected','مرفوضة'],['all','الكل']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: filter === val ? '#2B7FFF' : '#18181B', color: filter === val ? '#fff' : '#888' }}>{label}</button>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#666' }}>جاري التحميل...</p>}

        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <p>لا توجد طلبات</p>
          </div>
        )}

        {filtered.map(req => (
          <div key={req.id} style={{ background: '#18181B', borderRadius: 16, padding: 20, marginBottom: 12, border: `1px solid ${req.status === 'pending' ? '#92400E' : '#27272A'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 4px', color: '#fff' }}>{req.profiles?.full_name || 'مجهول'}</h2>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{req.profiles?.email}</p>
              </div>
              <span style={{ background: statusColor[req.status] + '20', color: statusColor[req.status], borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                {statusLabel[req.status]}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16, background: '#0F0F0F', borderRadius: 10, padding: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>المبلغ</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F59E0B' }}>{req.amount} ريال</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>البنك</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{req.bank_name}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>التاريخ</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{new Date(req.created_at).toLocaleDateString('ar-SA')}</div>
              </div>
            </div>

            <div style={{ background: '#0F0F0F', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>رقم الآيبان</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'monospace', letterSpacing: 1 }}>{req.iban}</div>
            </div>

            {req.status === 'pending' && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => approve(req.id, req.user_id, req.amount)} style={{ flex: 1, background: '#0A2A1A', color: '#10B981', border: '1px solid #166534', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  ✅ تم التحويل
                </button>
                <button onClick={() => reject(req.id)} style={{ flex: 1, background: '#1C0A0A', color: '#EF4444', border: '1px solid #450A0A', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  ❌ رفض
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
