"use client"
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, org_name: orgName }
        }
      })
      if (error) setError(error.message)
      else setMessage('تم إرسال رابط التأكيد على بريدك الإلكتروني')
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      } else {
        // Get user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profile?.role === 'admin') router.push('/admin')
        else router.push('/merchant')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          background: #FAFAF7;
          color: #0A0A0A;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        .auth-card {
          background: #fff;
          border: 1px solid #E5E4DE;
          border-radius: 20px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          margin: 24px;
        }
        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .auth-logo img { height: 44px; width: auto; mix-blend-mode: multiply; }
        .auth-title {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 8px;
        }
        .auth-sub {
          font-size: 14px;
          color: #6B6B66;
          text-align: center;
          margin-bottom: 32px;
        }
        .tabs {
          display: flex;
          background: #F2F1EC;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 28px;
        }
        .tab {
          flex: 1;
          padding: 8px;
          border: none;
          background: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
          color: #6B6B66;
          transition: all 0.2s;
        }
        .tab.active {
          background: #fff;
          color: #0A0A0A;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .field { margin-bottom: 16px; }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 6px;
        }
        .field input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #E5E4DE;
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          background: #FAFAF7;
          color: #0A0A0A;
          outline: none;
          transition: border 0.2s;
          direction: ltr;
          text-align: left;
        }
        .field input:focus { border-color: #2B7FFF; background: #fff; }
        .btn-primary {
          width: 100%;
          padding: 12px;
          background: #2B7FFF;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #1E5FCC; }
        .btn-primary:disabled { background: #9B9B96; cursor: not-allowed; }
        .msg-success {
          background: #D1FAE5;
          color: #065F46;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-top: 16px;
          text-align: center;
        }
        .msg-error {
          background: #FEE2E2;
          color: #991B1B;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-top: 16px;
          text-align: center;
        }
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          color: #9B9B96;
          font-size: 12px;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E5E4DE;
        }
      `}</style>

      <div className="auth-card" dir="rtl">
        <div className="auth-logo">
          <img src="/logo-light.jpg" alt="linenotpaid" />
        </div>

        <div className="tabs">
          <button
            className={`tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); setMessage('') }}
          >
            تسجيل الدخول
          </button>
          <button
            className={`tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setError(''); setMessage('') }}
          >
            حساب جديد
          </button>
        </div>

        {mode === 'signup' && (
          <>
            <div className="field">
              <label>الاسم الكامل</label>
              <input
                type="text"
                placeholder="محمد العلي"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>اسم المنشأة</label>
              <input
                type="text"
                placeholder="مطعم الأصالة"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="field">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>كلمة المرور</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || !email || !password}
        >
          {loading ? 'جاري التحميل...' : mode === 'login' ? 'دخول' : 'إنشاء حساب'}
        </button>

        {message && <div className="msg-success">{message}</div>}
        {error && <div className="msg-error">{error}</div>}
      </div>
    </>
  )
}
