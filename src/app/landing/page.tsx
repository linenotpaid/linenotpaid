'use client'
import Link from 'next/link'

export default function LandingPage() {
  const categories = [
    {title:'التجار والشركات',icon:'🏪',desc:'نظّم فعالياتك، تابع الحضور، وادر مكافآت عملائك.',features:['لوحة تحكم متكاملة','تتبع الحضور لحظياً','تقارير وإحصاءات','نظام مكافآت'],color:'#2B7FFF',bg:'#EEF4FF',cta:'ابدأ كتاجر'},
    {title:'الأفراد',icon:'👤',desc:'اكتشف الفعاليات القريبة واكسب مكافآت حقيقية.',features:['اكتشاف فعاليات','محفظة مكافآت','سجل حضور','مشاركة اجتماعية'],color:'#7C3AED',bg:'#F5F3FF',cta:'ابدأ كفرد'},
    {title:'المنظمون',icon:'🎯',desc:'أنشئ فعاليات احترافية وحدد شروط المكافآت.',features:['إنشاء فعاليات سريع','تخصيص المكافآت','تكامل API','دعم متخصص'],color:'#059669',bg:'#ECFDF5',cta:'ابدأ كمنظّم'},
  ]
  const steps = [
    {num:'01',title:'سجّل حسابك',desc:'أنشئ حسابك مجاناً في ثواني',icon:'👤'},
    {num:'02',title:'شارك في الفعالية',desc:'اكتشف الفعاليات وسجّل حضورك',icon:'📍'},
    {num:'03',title:'اكسب مكافآتك',desc:'صوّر وشارك واحصل على مكافآت',icon:'💰'},
  ]
  const plans = [
    {name:'Starter',price:'مجاني',features:['5 فعاليات/شهر','50 حاضر','تقارير أساسية','دعم بالبريد'],featured:false},
    {name:'Pro',price:'199 ر.س',features:['فعاليات غير محدودة','500 حاضر','تقارير متقدمة','دعم أولوية','API'],featured:true},
    {name:'Enterprise',price:'499 ر.س',features:['كل شي في Pro','حاضرون غير محدودون','مدير حساب','SLA','تخصيص كامل'],featured:false},
  ]
  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',direction:'rtl',color:'#0A0A0A',fontFamily:'sans-serif'}}>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'16px 40px',background:'rgba(250,250,247,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid #E8E8E4',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Link href="/"><img src="/logo-light.jpg" alt="linenotpaid" style={{height:44,width:'auto',mixBlendMode:'multiply'}} /></Link>
        <div style={{display:'flex',gap:32}}><a href="#categories" style={{color:'#666',fontSize:14,textDecoration:'none'}}>لمن المنصة</a><a href="#how" style={{color:'#666',fontSize:14,textDecoration:'none'}}>كيف يشتغل</a><a href="#pricing" style={{color:'#666',fontSize:14,textDecoration:'none'}}>الأسعار</a></div>
        <div style={{display:'flex',gap:12}}><Link href="/auth" style={{padding:'8px 20px',borderRadius:8,border:'1px solid #E8E8E4',fontSize:14,color:'#0A0A0A',textDecoration:'none',background:'white'}}>دخول</Link><Link href="/auth" style={{padding:'8px 20px',borderRadius:8,fontSize:14,color:'white',textDecoration:'none',background:'#0A0A0A'}}>ابدأ مجاناً</Link></div>
      </nav>
      <section style={{padding:'140px 24px 100px',textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',border:'1px solid #E8E8E4',borderRadius:100,padding:'6px 16px',marginBottom:32,fontSize:13,color:'#666'}}><span style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'inline-block'}}></span>منصة الفعاليات الأولى في السعودية</div>
        <h1 style={{fontSize:60,fontWeight:700,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:24}}>احضر، صوّر،<br/><span style={{color:'#2B7FFF'}}>واكسب فلوس</span></h1>
        <p style={{fontSize:18,color:'#666',lineHeight:1.7,maxWidth:560,margin:'0 auto 40px'}}>حلقة الوصل بين كل من ينظّم فعالية وكل من يبي يحضر — تجار، شركات، وأفراد.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}><Link href="/auth" style={{padding:'14px 32px',borderRadius:12,background:'#0A0A0A',color:'white',textDecoration:'none',fontSize:16,fontWeight:600}}>ابدأ مجاناً</Link><a href="#how" style={{padding:'14px 32px',borderRadius:12,background:'white',border:'1px solid #E8E8E4',color:'#0A0A0A',textDecoration:'none',fontSize:16}}>شوف كيف يشتغل</a></div>
        <div style={{display:'flex',justifyContent:'center',gap:48,marginTop:64,paddingTop:48,borderTop:'1px solid #E8E8E4'}}>
          {[{num:'+2,000',label:'مستخدم نشط'},{num:'+500',label:'فعالية منظّمة'},{num:'+50K',label:'ريال موزّع'}].map((s,i)=>(<div key={i} style={{textAlign:'center'}}><div style={{fontSize:32,fontWeight:700,color:'#2B7FFF'}}>{s.num}</div><div style={{fontSize:14,color:'#888',marginTop:4}}>{s.label}</div></div>))}
        </div>
      </section>
      <section id="categories" style={{padding:'80px 40px',maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}><p style={{fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'#888',marginBottom:12}}>لمن المنصة</p><h2 style={{fontSize:40,fontWeight:700}}>ثلاث فئات، منصة وحدة</h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {categories.map((cat,i)=>(<div key={i} style={{background:'white',borderRadius:20,padding:32,border:'1px solid #E8E8E4'}}><div style={{width:52,height:52,borderRadius:14,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,marginBottom:20}}>{cat.icon}</div><h3 style={{fontSize:20,fontWeight:700,marginBottom:12}}>{cat.title}</h3><p style={{color:'#666',fontSize:14,lineHeight:1.7,marginBottom:20}}>{cat.desc}</p><ul style={{listStyle:'none',padding:0,margin:'0 0 24px',display:'flex',flexDirection:'column',gap:8}}>{cat.features.map((f,j)=>(<li key={j} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#444'}}><span style={{color:cat.color}}>✓</span>{f}</li>))}</ul><Link href="/auth" style={{display:'block',textAlign:'center',padding:'10px',borderRadius:10,background:cat.color,color:'white',textDecoration:'none',fontSize:14,fontWeight:600}}>{cat.cta}</Link></div>))}
        </div>
      </section>
      <section id="how" style={{padding:'80px 40px',background:'#0A0A0A'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}><p style={{fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'#555',marginBottom:12}}>كيف يشتغل</p><h2 style={{fontSize:40,fontWeight:700,color:'white',marginBottom:56}}>3 خطوات بس</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {steps.map((s,i)=>(<div key={i} style={{background:'#141414',borderRadius:20,padding:32,border:'1px solid #222',textAlign:'right'}}><div style={{fontSize:11,color:'#2B7FFF',marginBottom:16,fontFamily:'monospace'}}>{s.num}</div><div style={{fontSize:36,marginBottom:16}}>{s.icon}</div><h3 style={{fontSize:18,fontWeight:700,color:'white',marginBottom:8}}>{s.title}</h3><p style={{color:'#666',fontSize:14,lineHeight:1.7}}>{s.desc}</p></div>))}
          </div>
        </div>
      </section>
      <section id="pricing" style={{padding:'80px 40px',maxWidth:900,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}><p style={{fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'#888',marginBottom:12}}>الأسعار</p><h2 style={{fontSize:40,fontWeight:700}}>ابدأ مجاناً، وسّع لما تكبر</h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {plans.map((pkg,i)=>(<div key={i} style={{background:pkg.featured?'#0A0A0A':'white',borderRadius:20,padding:32,border:pkg.featured?'2px solid #2B7FFF':'1px solid #E8E8E4',position:'relative',transform:pkg.featured?'scale(1.04)':'none'}}>{pkg.featured&&<div style={{position:'absolute',top:-12,right:24,background:'#2B7FFF',color:'white',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:100}}>الأكثر شيوعاً</div>}<h3 style={{fontSize:18,fontWeight:700,color:pkg.featured?'white':'#0A0A0A',marginBottom:8}}>{pkg.name}</h3><div style={{fontSize:32,fontWeight:800,color:pkg.featured?'white':'#0A0A0A',marginBottom:24}}>{pkg.price}</div><ul style={{listStyle:'none',padding:0,margin:'0 0 24px',display:'flex',flexDirection:'column',gap:10}}>{pkg.features.map((f,j)=>(<li key={j} style={{display:'flex',alignItems:'center',gap:8,fontSize:14,color:pkg.featured?'#ccc':'#444'}}><span style={{color:'#2B7FFF'}}>✓</span>{f}</li>))}</ul><Link href="/auth" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:10,background:pkg.featured?'#2B7FFF':'#F5F5F5',color:pkg.featured?'white':'#0A0A0A',textDecoration:'none',fontSize:14,fontWeight:600}}>ابدأ الآن</Link></div>))}
        </div>
      </section>
      <section style={{margin:'0 40px 80px',borderRadius:24,background:'linear-gradient(135deg,#0A0A0A,#1a1a2e)',padding:'64px 40px',textAlign:'center'}}><h2 style={{fontSize:40,fontWeight:700,color:'white',marginBottom:16}}>جاهز تبدأ؟</h2><p style={{color:'#888',fontSize:16,marginBottom:32}}>انضم لآلاف المستخدمين في linenotpaid</p><Link href="/auth" style={{padding:'16px 48px',borderRadius:12,background:'#2B7FFF',color:'white',textDecoration:'none',fontSize:16,fontWeight:700}}>ابدأ مجاناً الآن</Link></section>
      <footer style={{borderTop:'1px solid #E8E8E4',padding:'40px',display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:1100,margin:'0 auto'}}><img src="/logo-light.jpg" alt="linenotpaid" style={{height:40,mixBlendMode:'multiply'}} /><p style={{color:'#888',fontSize:13}}>© 2026 Line Not Paid. كل الحقوق محفوظة.</p><div style={{display:'flex',gap:20}}><a href="#" style={{color:'#888',fontSize:13,textDecoration:'none'}}>الشروط</a><a href="#" style={{color:'#888',fontSize:13,textDecoration:'none'}}>الخصوصية</a></div></footer>
    </div>
  )
}