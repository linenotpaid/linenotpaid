'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/'
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } }
      })
      if (error) setMessage(error.message)
      else setMessage('تم إنشاء الحساب! تحقق من بريدك الإلكتروني')
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{background:'#FAFAF7',borderRadius:20,padding:'40px 32px',width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:56,height:56,background:'#0A0A0A',borderRadius:'50%',margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#2B7FFF',fontSize:24}}>●</span>
          </div>
          <h1 style={{fontSize:24,fontWeight:700,marginBottom:4}}>
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
          <p style={{color:'#6B6B66',fontSize:14}}>Line Not Paid</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>الاسم الكامل</label>
              <input
                type="text" value={name} onChange={e=>setName(e.target.value)}
                placeholder="محمد العتيبي" required={!isLogin}
                style={{width:'100%',padding:'12px 14px',border:'1.5px solid #E5E4DE',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}
              />
            </div>
          )}
          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>البريد الإلكتروني</label>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="example@email.com" required
              style={{width:'100%',padding:'12px 14px',border:'1.5px solid #E5E4DE',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}
            />
          </div>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>كلمة المرور</label>
            <input
              type="password" value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="8 أحرف على الأقل" required
              style={{width:'100%',padding:'12px 14px',border:'1.5px solid #E5E4DE',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}
            />
          </div>

          {message && (
            <div style={{background:'#E8F0FF',color:'#2B7FFF',padding:'10px 14px',borderRadius:8,fontSize:13,marginBottom:16,textAlign:'center'}}>
              {message}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'14px',background:'#0A0A0A',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
            {loading ? 'جاري...' : isLogin ? 'دخول' : 'إنشاء الحساب'}
          </button>
        </form>

        <p style={{textAlign:'center',fontSize:13,color:'#6B6B66',marginTop:20}}>
          {isLogin ? 'ما عندك حساب؟' : 'لديك حساب؟'}
          <span onClick={()=>setIsLogin(!isLogin)}
            style={{color:'#2B7FFF',cursor:'pointer',marginRight:4}}>
            {isLogin ? ' سجّل الآن' : ' تسجيل دخول'}
          </span>
        </p>
      </div>
    </div>
  )
}
