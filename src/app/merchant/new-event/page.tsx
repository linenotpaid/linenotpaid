'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewEventPage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', type: '', location: '',
    event_date: '', start_time: '', end_time: '', capacity: '',
    price_points: '', registration_deadline: '',
    condition_type: 'none', conditions: '', proof_deadline_hours: '18',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }
      const { error } = await supabase.from('events').insert({
        merchant_id: user.id,
        title: form.title, description: form.description,
        type: form.type, location: form.location,
        event_date: form.event_date, start_time: form.start_time,
        end_time: form.end_time, capacity: parseInt(form.capacity),
        price_points: parseInt(form.price_points),
        registration_deadline: form.registration_deadline,
        condition_type: form.condition_type, conditions: form.conditions,
        proof_deadline_hours: parseInt(form.proof_deadline_hours),
        status: 'draft',
      })
      if (error) throw error
      alert('تم إرسال الفعالية للمراجعة ✅')
      router.push('/merchant')
    } catch (err) {
      console.error(err)
      alert('حدث خطأ، حاول مجدداً')
    } finally {
      setLoading(false)
    }
  }

  const card: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 24, marginBottom: 16, border: '1px solid #EBEBEB' }
  const cardTitle: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 20, marginTop: 0 }
  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }
  const field: React.CSSProperties = { marginBottom: 16 }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }
  const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #EBEBEB', fontSize: 14, color: '#0A0A0A', background: '#FAFAF7', boxSizing: 'border-box', outline: 'none', fontFamily: 'system-ui', direction: 'rtl' }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'system-ui', direction: 'rtl' }}>
      <div style={{ background: '#0A0A0A', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.push('/merchant')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>← رجوع</button>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>إنشاء فعالية جديدة</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 680, margin: '32px auto', padding: '0 16px' }}>

        <div style={card}>
          <h2 style={cardTitle}>المعلومات الأساسية</h2>
          <div style={grid2}>
            <div style={field}>
              <label style={lbl}>عنوان الفعالية *</label>
              <input style={inp} required value={form.title} onChange={e => set('title', e.target.value)} placeholder="مثال: ليلة عشاء مميزة" />
            </div>
            <div style={field}>
              <label style={lbl}>نوع الفعالية *</label>
              <select style={inp} required value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="">اختر النوع</option>
                <option value="مطعم">مطعم</option>
                <option value="شركة">شركة</option>
                <option value="فعالية">فعالية عامة</option>
                <option value="رياضي">رياضي</option>
                <option value="ترفيهي">ترفيهي</option>
              </select>
            </div>
          </div>
          <div style={field}>
            <label style={lbl}>وصف الفعالية</label>
            <textarea style={{ ...inp, height: 100, resize: 'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="اكتب وصفاً مختصراً للفعالية..." />
          </div>
        </div>

        <div style={card}>
          <h2 style={cardTitle}>الموقع والوقت</h2>
          <div style={field}>
            <label style={lbl}>الموقع *</label>
            <input style={inp} required value={form.location} onChange={e => set('location', e.target.value)} placeholder="مثال: الرياض، حي العليا — مطعم الأندلس" />
          </div>
          <div style={grid2}>
            <div style={field}>
              <label style={lbl}>تاريخ الفعالية *</label>
              <input style={inp} type="date" required value={form.event_date} onChange={e => set('event_date', e.target.value)} />
            </div>
            <div style={field}>
              <label style={lbl}>آخر موعد تسجيل</label>
              <input style={inp} type="date" value={form.registration_deadline} onChange={e => set('registration_deadline', e.target.value)} />
            </div>
            <div style={field}>
              <label style={lbl}>وقت البداية *</label>
              <input style={inp} type="time" required value={form.start_time} onChange={e => set('start_time', e.target.value)} />
            </div>
            <div style={field}>
              <label style={lbl}>وقت النهاية</label>
              <input style={inp} type="time" value={form.end_time} onChange={e => set('end_time', e.target.value)} />
            </div>
          </div>
        </div>

        <div style={card}>
          <h2 style={cardTitle}>السعة والنقاط</h2>
          <div style={grid2}>
            <div style={field}>
              <label style={lbl}>عدد المقاعد *</label>
              <input style={inp} type="number" required min={1} value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="مثال: 50" />
            </div>
            <div style={field}>
              <label style={lbl}>النقاط المكتسبة *</label>
              <input style={inp} type="number" required min={0} value={form.price_points} onChange={e => set('price_points', e.target.value)} placeholder="مثال: 100" />
            </div>
          </div>
        </div>

        <div style={card}>
          <h2 style={cardTitle}>الشروط والإثبات</h2>
          <div style={field}>
            <label style={lbl}>نوع الشرط</label>
            <select style={inp} value={form.condition_type} onChange={e => set('condition_type', e.target.value)}>
              <option value="none">بدون شرط</option>
              <option value="snapchat">تصوير سناب شات</option>
              <option value="purchase">شراء بمبلغ محدد</option>
              <option value="custom">شرط مخصص</option>
            </select>
          </div>
          {form.condition_type !== 'none' && <>
            <div style={field}>
              <label style={lbl}>تفاصيل الشرط *</label>
              <textarea style={{ ...inp, height: 80, resize: 'vertical' }} value={form.conditions} onChange={e => set('conditions', e.target.value)}
                placeholder={form.condition_type === 'snapchat' ? 'مثال: صور قصة سناب وذكر حساب @linenotpaid' : form.condition_type === 'purchase' ? 'مثال: شراء بقيمة لا تقل عن 50 ريال' : 'اكتب تفاصيل الشرط...'} />
            </div>
            <div style={field}>
              <label style={lbl}>مهلة رفع الإثبات</label>
              <select style={inp} value={form.proof_deadline_hours} onChange={e => set('proof_deadline_hours', e.target.value)}>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="18">18 ساعة</option>
                <option value="24">24 ساعة</option>
                <option value="48">48 ساعة</option>
              </select>
            </div>
          </>}
        </div>

        <div style={{ background: '#EEF4FF', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #C7DCFF' }}>
          <p style={{ margin: 0, color: '#2B7FFF', fontSize: 13, lineHeight: 1.6 }}>
            ⚠️ الفعالية ستُرسل بحالة <strong>مسودة</strong> — ستراجعها الإدارة وتنشرها خلال 24 ساعة
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
          <button type="submit" disabled={loading} style={{ flex: 1, background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'جاري الإرسال...' : 'إرسال للمراجعة ←'}
          </button>
          <button type="button" onClick={() => router.push('/merchant')} style={{ padding: '16px 24px', background: '#fff', border: '1px solid #EBEBEB', borderRadius: 12, fontSize: 14, cursor: 'pointer', color: '#666' }}>
            إلغاء
          </button>
        </div>
      </form>
    </div>
  )
}
