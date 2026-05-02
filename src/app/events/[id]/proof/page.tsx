'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

type Step = 'instructions' | 'upload_content' | 'wait' | 'upload_analytics' | 'done'

export default function ProofPage() {
  const { id } = useParams()
  const [step, setStep] = useState<Step>('instructions')
  const [proofType, setProofType] = useState('snap')
  const [proofUrl, setProofUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitProof() {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setStep('done')
  }

  // ── الخطوة 1: التعليمات ──
  if (step === 'instructions') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      <div style={{background:'#0A0A0A',padding:'52px 20px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>window.history.back()}
          style={{width:34,height:34,background:'rgba(255,255,255,0.1)',border:'none',borderRadius:9,color:'white',fontSize:16,cursor:'pointer'}}>←</button>
        <span style={{color:'white',fontWeight:600,fontSize:16}}>إثبات الحضور</span>
      </div>
      <div style={{padding:'20px 16px',maxWidth:480,margin:'0 auto'}}>
        <h2 style={{fontSize:20,fontWeight:700,marginBottom:6}}>كيف يشتغل نظام الإثبات؟</h2>
        <p style={{color:'#6B6B66',fontSize:13,marginBottom:24,lineHeight:1.6}}>
          عشان تضمن مكافأتك، لازم تكمّل 3 خطوات بسيطة
        </p>

        {[
          {
            num:'1', emoji:'📍',
            title:'احضر وصوّر',
            desc:'احضر للمكان في الوقت المحدد. صوّر سناب شات أو انستقرام ستوري وأنت في المكان — يجب يظهر اسم الفعالية أو المكان.'
          },
          {
            num:'2', emoji:'⏰',
            title:'انتظر 18 ساعة',
            desc:'بعد نشر المحتوى، انتظر 18 ساعة عشان يتراكم عدد المشاهدين. هذا يثبت إن المحتوى وصل لناس حقيقيين.'
          },
          {
            num:'3', emoji:'📊',
            title:'صوّر الـ Analytics',
            desc:'بعد 18 ساعة، افتح السناب أو الستوري وصوّر شاشة عدد المشاهدين (Views). ارفعها هنا لإتمام الإثبات.'
          },
        ].map((s,i) => (
          <div key={i} style={{display:'flex',gap:14,padding:16,background:'white',border:'1px solid #E5E4DE',borderRadius:14,marginBottom:10}}>
            <div style={{
              width:36,height:36,background:'#0A0A0A',borderRadius:'50%',
              color:'white',fontWeight:700,fontSize:13,
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0
            }}>{s.num}</div>
            <div>
              <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{s.emoji} {s.title}</div>
              <div style={{fontSize:12,color:'#6B6B66',lineHeight:1.6}}>{s.desc}</div>
            </div>
          </div>
        ))}

        <div style={{background:'#FEF3C7',border:'1px solid #F59E0B',borderRadius:12,padding:14,marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>💡 لماذا نطلب الـ Analytics؟</div>
          <div style={{fontSize:12,color:'#6B6B66',lineHeight:1.6}}>
            التاجر يدفع عشان محتواك يوصل لناس حقيقيين — مو بس تصور وتحذف. الأكثر مشاهدات = قيمة أعلى للتاجر = مكافآت أفضل لك.
          </div>
        </div>

        <button onClick={()=>setStep('upload_content')}
          style={{width:'100%',padding:14,background:'#0A0A0A',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
          فاهمت — ابدأ الإثبات
        </button>
      </div>
    </div>
  )

  // ── الخطوة 2: رفع المحتوى ──
  if (step === 'upload_content') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      <div style={{background:'#0A0A0A',padding:'52px 20px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>setStep('instructions')}
          style={{width:34,height:34,background:'rgba(255,255,255,0.1)',border:'none',borderRadius:9,color:'white',fontSize:16,cursor:'pointer'}}>←</button>
        <div>
          <span style={{color:'white',fontWeight:600,fontSize:16}}>الخطوة 1 من 2</span>
          <div style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>أرسل رابط المحتوى</div>
        </div>
        <div style={{marginRight:'auto',display:'flex',gap:4}}>
          {[1,2].map(n=>(
            <div key={n} style={{width:24,height:4,borderRadius:2,background:n===1?'#2B7FFF':'rgba(255,255,255,0.2)'}}></div>
          ))}
        </div>
      </div>

      <div style={{padding:'20px 16px',maxWidth:480,margin:'0 auto'}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:6}}>أرسل رابط محتواك</h2>
        <p style={{color:'#6B6B66',fontSize:13,marginBottom:20,lineHeight:1.6}}>
          بعد ما تنشر السناب أو الستوري وأنت في المكان، انسخ الرابط وأرسله هنا
        </p>

        <div style={{marginBottom:16}}>
          <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:8}}>نوع المحتوى</label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[
              {key:'snap', label:'📸 سناب شات'},
              {key:'instagram', label:'📷 انستقرام'},
            ].map(opt => (
              <button key={opt.key} type="button" onClick={()=>setProofType(opt.key)}
                style={{
                  padding:12,border:`2px solid ${proofType===opt.key?'#0A0A0A':'#E5E4DE'}`,
                  background:proofType===opt.key?'#0A0A0A':'white',
                  color:proofType===opt.key?'white':'#0A0A0A',
                  borderRadius:10,fontSize:13,fontWeight:500,cursor:'pointer'
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>رابط المحتوى</label>
          <div style={{background:'white',border:'1.5px solid #E5E4DE',borderRadius:10,display:'flex',alignItems:'center',gap:8,padding:'0 14px',height:50}}>
            <span>🔗</span>
            <input type="url" value={proofUrl} onChange={e=>setProofUrl(e.target.value)}
              placeholder="https://..."
              style={{flex:1,border:'none',outline:'none',fontSize:14,fontFamily:'sans-serif'}}/>
          </div>
        </div>

        <div style={{background:'#E8F0FF',borderRadius:12,padding:14,marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:600,marginBottom:4,color:'#2B7FFF'}}>⏰ بعد الإرسال</div>
          <div style={{fontSize:12,color:'#6B6B66',lineHeight:1.6}}>
            بعد ما ترسل الرابط، انتظر <strong>18 ساعة</strong> ثم ارجع هنا لرفع صورة الـ Analytics
          </div>
        </div>

        <button onClick={()=>{if(proofUrl)setStep('wait')}} disabled={!proofUrl}
          style={{
            width:'100%',padding:14,
            background:proofUrl?'#0A0A0A':'#E5E4DE',
            color:proofUrl?'white':'#B0B0AA',
            border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'
          }}>
          إرسال الرابط والانتظار 18 ساعة
        </button>
      </div>
    </div>
  )

  // ── الخطوة 3: انتظر ──
  if (step === 'wait') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{textAlign:'center',maxWidth:320}}>
        <div style={{fontSize:64,marginBottom:16}}>⏰</div>
        <h2 style={{fontSize:22,fontWeight:700,marginBottom:8}}>تم إرسال المحتوى!</h2>
        <p style={{color:'#6B6B66',fontSize:14,marginBottom:24,lineHeight:1.7}}>
          انتظر <strong>18 ساعة</strong> من الآن، ثم ارجع هنا لرفع صورة عدد المشاهدين
        </p>
        <div style={{background:'#F2F1EC',borderRadius:12,padding:16,marginBottom:20,textAlign:'right'}}>
          <div style={{fontSize:12,color:'#6B6B66',marginBottom:8}}>كيف تصور الـ Analytics؟</div>
          {[
            'افتح تطبيق سناب أو انستقرام',
            'روح على الستوري أو السناب اللي نشرته',
            'اضغط على رقم المشاهدين',
            'صوّر الشاشة كاملة',
          ].map((s,i)=>(
            <div key={i} style={{display:'flex',gap:8,marginBottom:6,fontSize:12,color:'#6B6B66'}}>
              <span style={{fontWeight:700,color:'#0A0A0A'}}>{i+1}.</span> {s}
            </div>
          ))}
        </div>
        <button onClick={()=>setStep('upload_analytics')}
          style={{width:'100%',padding:14,background:'#2B7FFF',color:'white',border:'none',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer',marginBottom:10}}>
          جاهز — ارفع الـ Analytics
        </button>
        <button onClick={()=>window.location.href='/'}
          style={{width:'100%',padding:14,background:'transparent',color:'#6B6B66',border:'1px solid #E5E4DE',borderRadius:10,fontSize:14,cursor:'pointer'}}>
          ارجع لاحقاً
        </button>
      </div>
    </div>
  )

  // ── الخطوة 4: رفع Analytics ──
  if (step === 'upload_analytics') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      <div style={{background:'#0A0A0A',padding:'52px 20px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>setStep('wait')}
          style={{width:34,height:34,background:'rgba(255,255,255,0.1)',border:'none',borderRadius:9,color:'white',fontSize:16,cursor:'pointer'}}>←</button>
        <div>
          <span style={{color:'white',fontWeight:600,fontSize:16}}>الخطوة 2 من 2</span>
          <div style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>ارفع صورة المشاهدين</div>
        </div>
        <div style={{marginRight:'auto',display:'flex',gap:4}}>
          {[1,2].map(n=>(
            <div key={n} style={{width:24,height:4,borderRadius:2,background:'#2B7FFF'}}></div>
          ))}
        </div>
      </div>

      <div style={{padding:'20px 16px',maxWidth:480,margin:'0 auto'}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:6}}>ارفع صورة الـ Analytics</h2>
        <p style={{color:'#6B6B66',fontSize:13,marginBottom:20,lineHeight:1.6}}>
          صوّر شاشة عدد المشاهدين بعد 18 ساعة من النشر وارفعها هنا
        </p>

        {/* Example */}
        <div style={{background:'#0A0A0A',borderRadius:14,padding:16,marginBottom:16,textAlign:'center'}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:8}}>مثال على الصورة المطلوبة</div>
          <div style={{background:'#1A1A2E',borderRadius:10,padding:16,display:'inline-block',minWidth:160}}>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginBottom:4}}>Views</div>
            <div style={{fontSize:32,fontWeight:700,color:'white'}}>1,247</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>عدد المشاهدين</div>
          </div>
        </div>

        {/* Upload */}
        <div style={{
          background:'white',border:'2px dashed #E5E4DE',borderRadius:12,
          padding:32,textAlign:'center',cursor:'pointer',marginBottom:16
        }}>
          <div style={{fontSize:36,marginBottom:10}}>📊</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>اضغط لرفع الصورة</div>
          <div style={{fontSize:12,color:'#6B6B66'}}>PNG أو JPG — صورة شاشة الـ Analytics</div>
        </div>

        <div style={{background:'#D1FAE5',border:'1px solid #10B981',borderRadius:12,padding:14,marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:600,color:'#10B981',marginBottom:4}}>✅ كلما زادت المشاهدات</div>
          <div style={{fontSize:12,color:'#6B6B66',lineHeight:1.6}}>
            المكافأة الأساسية مضمونة. لكن التجار يعطون مكافآت إضافية للمحتوى اللي وصل لأكثر مشاهدين!
          </div>
        </div>

        <button onClick={submitProof} disabled={submitting}
          style={{width:'100%',padding:14,background:'#10B981',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
          {submitting ? 'جاري الإرسال...' : 'إرسال الإثبات الكامل'}
        </button>
      </div>
    </div>
  )

  // ── الخطوة 5: تم ──
  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',direction:'rtl',padding:20}}>
      <div style={{textAlign:'center',maxWidth:320}}>
        <div style={{width:80,height:80,background:'#D1FAE5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:36}}>✅</div>
        <h2 style={{fontSize:22,fontWeight:700,marginBottom:8}}>تم إرسال الإثبات الكامل!</h2>
        <p style={{color:'#6B6B66',fontSize:14,marginBottom:6,lineHeight:1.6}}>
          راح يراجع فريقنا إثباتك خلال ساعة ويحوّل لك المكافأة
        </p>
        <div style={{background:'#F2F1EC',borderRadius:12,padding:16,marginBottom:20}}>
          <div style={{fontSize:12,color:'#6B6B66',marginBottom:4}}>المكافأة المنتظرة</div>
          <div style={{fontSize:32,fontWeight:700,color:'#10B981'}}>+10 ريال</div>
          <div style={{fontSize:11,color:'#6B6B66'}}>+ مكافأة إضافية حسب المشاهدات</div>
        </div>
        <button onClick={()=>window.location.href='/'}
          style={{width:'100%',padding:14,background:'#0A0A0A',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
          العودة للرئيسية
        </button>
      </div>
    </div>
  )
}
