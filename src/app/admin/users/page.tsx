'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminUsersPage() {
  const supabase = createClient()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (data) setUsers(data)
    setLoading(false)
  }

  async function blockUser(id: string) {
    await supabase.from('profiles').update({ blocked: true }).eq('id', id)
    setUsers(prev => prev.map(u => u.id === id ? { ...u, blocked: true } : u))
  }

  async function unblockUser(id: string) {
    await supabase.from('profiles').update({ blocked: false }).eq('id', id)
    setUsers(prev => prev.map(u => u.id === id ? { ...u, blocked: false } : u))
  }

  const filtered = users.filter(u => u.full_name?.includes(search) || u.email?.includes(search))

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', fontFamily: 'system-ui', direction: 'rtl' }}>
      <div style={{ background: '#060607', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid #27272A' }}>
        <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>المستخدمون</h1>
        <span style={{ background: '#27272A', color: '#888', borderRadius: 20, padding: '2px 10px', fontSize: 13 }}>{users.length}</span>
      </div>
      <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 16px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث بالاسم أو البريد..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #27272A', background: '#18181B', color: '#fff', fontSize: 14, marginBottom: 20, direction: 'rtl' }} />
        {loading && <p style={{ textAlign: 'center', color: '#666' }}>جاري التحميل...</p>}
        {filtered.map(user => (
          <div key={user.id} style={{ background: '#18181B', borderRadius: 16, padding: 20, marginBottom: 12, border: `1px solid ${user.blocked ? '#450A0A' : '#27272A'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: '#fff' }}>{user.full_name || 'بدون اسم'}</h2>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{user.email}</p>
              </div>
              <span style={{ background: user.blocked ? '#450A0A' : '#0A2A1A', color: user.blocked ? '#EF4444' : '#10B981', borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                {user.blocked ? 'موقوف' : 'نشط'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16, background: '#0F0F0F', borderRadius: 10, padding: 12 }}>
              {[['المستوى', user.level || 1],['الأرباح', (user.earnings || 0) + ' ريال'],['Streak', user.streak || 0],['تغيب', user.no_show_count || 0]].map(([label, val]) => (
                <div key={label}><div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{val}</div></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {user.blocked ? (
                <button onClick={() => unblockUser(user.id)} style={{ flex: 1, background: '#0A2A1A', color: '#10B981', border: '1px solid #166534', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>✅ رفع الإيقاف</button>
              ) : (
                <button onClick={() => blockUser(user.id)} style={{ flex: 1, background: '#1C0A0A', color: '#EF4444', border: '1px solid #450A0A', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>🚫 إيقاف الحساب</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
