'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
        :root { --bg:#FAFAF7;--bg-soft:#F2F1EC;--ink:#0A0A0A;--ink-soft:#1A1A1A;--muted:#6B6B66;--line:#E5E4DE;--accent:#2B7FFF;--accent-soft:#E8F0FF;--green:#10B981; }
        .lnp *{margin:0;padding:0;box-sizing:border-box}
        .lnp{font-family:'IBM Plex Sans Arabic',sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;overflow-x:hidden;direction:rtl}
        .lnp-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 40px;background:rgba(250,250,247,0.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
        .lnp-nav img{height:44px;width:auto;mix-blend-mode:multiply}
        .lnp-nav-links{display:flex;gap:36px;list-style:none;font-size:14px}
        .lnp-nav-links a{color:var(--ink-soft);text-decoration:none}
        .lnp-nav-links a:hover{color:var(--accent)}
        .lnp-nav-cta{display:flex;gap:12px}
        .btn{padding:11px 22px;border-radius:100px;font-size:14px;font-weight:500;cursor:pointer;border:none;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s}
        .btn-ghost{background:transparent;color:var(--ink)}
        .btn-ghost:hover{background:var(--bg-soft)}
        .btn-dark{background:var(--ink);color:var(--bg)}
        .btn-dark:hover{background:var(--accent);transform:translateY(-1px)}
        .btn-primary{background:var(--ink);color:var(--bg);padding:16px 28px;font-size:15px}
        .btn-primary:hover{background:var(--accent);transform:translateY(-2px);box-shadow:0 12px 30px rgba(43,127,255,0.25)}
        .btn-secondary{background:transparent;color:var(--ink);border:1px solid var(--line);padding:16px 28px;font-size:15px}
        .btn-secondary:hover{background:var(--ink);color:var(--bg)}
        .lnp-hero{min-height:100vh;padding:140px 40px 80px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
        .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:80px 80px;opacity:0.4;mask-image:radial-gradient(ellipse at center,black 30%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at center,black 30%,transparent 70%)}
        .hero-content{max-width:1280px;margin:0 auto;width:100%;position:relative;z-index:2}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:var(--bg-soft);border:1px solid var(--line);border-radius:100px;font-size:13px;color:var(--muted);margin-bottom:32px}
        .hero-badge .dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .lnp-hero h1{font-size:clamp(48px,8vw,110px);line-height:0.95;letter-spacing:-0.04em;font-weight:600;margin-bottom:24px;animation:fadeUp 0.8s ease 0.1s both}
        .accent-text{color:var(--accent);font-style:italic;font-family:'Instrument Serif',serif;font-weight:400}
        .lnp-hero p{font-size:clamp(17px,1.5vw,21px);color:var(--muted);max-width:620px;margin-bottom:40px;animation:fadeUp 0.8s ease 0.2s both}
        .hero-actions{display:flex;gap:14px;align-items:center;flex-wrap:wrap;animation:fadeUp 0.8s ease 0.3s both}
        .hero-stats{margin-top:80px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);animation:fadeUp 0.8s ease 0.5s both}
        .stat-cell{padding:28px 24px;border-left:1px solid var(--line)}
        .stat-cell:first-child{border-left:none}
        .stat-num{font-family:'Instrument Serif',serif;font-size:56px;line-height:1;letter-spacing:-0.03em;margin-bottom:6px}
        .stat-num .plus{color:var(--accent);font-style:italic}
        .stat-label{font-size:13px;color:var(--muted)}
        .section{padding:120px 40px;max-width:1280px;margin:0 auto}
        .section-label{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .section-label::before{content:'';width:24px;height:1px;background:var(--ink)}
        .section-title{font-size:clamp(36px,5vw,64px);line-height:1;letter-spacing:-0.03em;font-weight:600;margin-bottom:24px;max-width:800px}
        .section-subtitle{font-size:19px;color:var(--muted);max-width:600px;margin-bottom:80px}
        .categories{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:60px}
        .category-card{border:1px solid var(--line);border-radius:20px;padding:40px 32px;background:var(--bg);transition:all 0.4s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden;cursor:pointer;min-height:480px;display:flex;flex-direction:column}
        .category-card::before{content:'';position:absolute;top:0;right:0;width:100%;height:100%;background:linear-gradient(135deg,transparent 50%,var(--accent-soft) 100%);opacity:0;transition:opacity 0.4s}
        .category-card:hover{border-color:var(--ink);transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,0.08)}
        .category-card:hover::before{opacity:1}
        .category-card.dark{background:var(--ink);color:var(--bg);border-color:var(--ink)}
        .category-tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:24px;position:relative;z-index:2}
        .category-card.dark .category-tag{color:rgba(255,255,255,0.5)}
        .category-illustration{height:120px;margin-bottom:28px;position:relative;z-index:2;display:flex;align-items:center;justify-content:center}
        .category-icon-bg{width:88px;height:88px;background:var(--bg-soft);border-radius:20px;display:flex;align-items:center;justify-content:center;transition:all 0.4s}
        .category-card.dark .category-icon-bg{background:rgba(255,255,255,0.06)}
        .category-card:hover .category-icon-bg{background:var(--accent);transform:rotate(-6deg) scale(1.05)}
        .category-card h3{font-size:28px;font-weight:600;letter-spacing:-0.02em;margin-bottom:12px;position:relative;z-index:2}
        .category-card h3 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--accent)}
        .category-card>p{color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:28px;position:relative;z-index:2}
        .category-card.dark>p{color:rgba(255,255,255,0.65)}
        .category-examples{list-style:none;margin-top:auto;border-top:1px solid var(--line);padding-top:20px;position:relative;z-index:2}
        .category-card.dark .category-examples{border-color:rgba(255,255,255,0.1)}
        .category-examples li{padding:8px 0;font-size:14px;display:flex;align-items:center;gap:10px;color:var(--ink-soft)}
        .category-card.dark .category-examples li{color:rgba(255,255,255,0.85)}
        .category-examples li::before{content:'→';color:var(--accent);font-size:14px}
        .steps{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line)}
        .step{padding:48px 32px;border-left:1px solid var(--line);position:relative;transition:background 0.3s}
        .step:first-child{border-left:none}
        .step:hover{background:var(--bg-soft)}
        .step-num{font-family:'Instrument Serif',serif;font-style:italic;font-size:80px;color:var(--accent);line-height:1;margin-bottom:32px;letter-spacing:-0.03em}
        .step-title{font-size:24px;font-weight:600;letter-spacing:-0.02em;margin-bottom:12px}
        .step-desc{color:var(--muted);font-size:15px;line-height:1.7}
        .dashboard-section{background:var(--ink);color:var(--bg);padding:120px 40px;border-radius:32px;margin:0 40px;overflow:hidden}
        .dashboard-section-inner{max-width:1280px;margin:0 auto}
        .dashboard-section .section-title{color:var(--bg)}
        .dashboard-section .section-subtitle{color:rgba(255,255,255,0.6)}
        .dashboard-section .section-label{color:rgba(255,255,255,0.5)}
        .dashboard-section .section-label::before{background:var(--bg)}
        .dashboard-mockup{background:#1A1A1A;border:1px solid #2A2A2A;border-radius:16px;overflow:hidden;margin-top:60px;box-shadow:0 40px 100px rgba(0,0,0,0.4)}
        .mockup-header{padding:14px 20px;background:#0F0F0F;border-bottom:1px solid #2A2A2A;display:flex;align-items:center;gap:8px}
        .mockup-dot{width:11px;height:11px;border-radius:50%;background:#333}
        .mockup-dot.r{background:#FF5F57}.mockup-dot.y{background:#FEBC2E}.mockup-dot.g{background:#28C840}
        .mockup-url{margin-right:auto;font-family:'JetBrains Mono',monospace;font-size:11px;color:#666;background:#0A0A0A;padding:5px 14px;border-radius:6px}
        .mockup-body{display:grid;grid-template-columns:220px 1fr;min-height:580px}
        .mockup-sidebar{background:#0F0F0F;border-left:1px solid #2A2A2A;padding:24px 16px}
        .mockup-brand{display:flex;align-items:center;gap:8px;margin-bottom:32px;padding:0 8px}
        .mockup-brand-name{font-size:13px;font-weight:600;color:var(--bg)}
        .mockup-nav-item{padding:9px 12px;font-size:13px;color:#888;border-radius:6px;margin-bottom:2px;cursor:pointer;display:flex;align-items:center;gap:10px}
        .mockup-nav-item.active{background:var(--accent);color:white}
        .mockup-content{padding:32px;background:#1A1A1A}
        .mockup-page-title{font-size:22px;font-weight:600;margin-bottom:4px;color:var(--bg)}
        .mockup-page-sub{font-size:13px;color:#888;margin-bottom:28px}
        .mockup-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
        .mockup-stat{background:#0F0F0F;border:1px solid #2A2A2A;border-radius:10px;padding:16px}
        .mockup-stat-label{font-size:11px;color:#888;margin-bottom:8px;font-family:'JetBrains Mono',monospace}
        .mockup-stat-value{font-size:24px;font-weight:600;color:var(--bg)}
        .mockup-stat-trend{font-size:11px;color:var(--green);margin-top:6px}
        .mockup-chart{background:#0F0F0F;border:1px solid #2A2A2A;border-radius:10px;padding:20px;height:220px}
        .mockup-chart-title{font-size:13px;color:var(--bg);margin-bottom:16px;display:flex;justify-content:space-between}
        .split-section{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
        .split-half{padding:100px 60px;border-left:1px solid var(--line);position:relative;overflow:hidden}
        .split-half:first-child{border-left:none}
        .split-half.dark{background:var(--ink);color:var(--bg)}
        .split-tag{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:24px;color:var(--muted)}
        .split-half.dark .split-tag{color:rgba(255,255,255,0.5)}
        .split-h{font-size:42px;font-family:'Instrument Serif',serif;font-weight:400;line-height:1.1;letter-spacing:-0.02em;margin-bottom:24px}
        .split-list{list-style:none;margin-top:32px}
        .split-list li{padding:16px 0;border-bottom:1px solid var(--line);font-size:15px;display:flex;align-items:center;gap:14px}
        .split-half.dark .split-list li{border-color:rgba(255,255,255,0.1)}
        .split-list li::before{content:'+';color:var(--accent);font-size:18px;font-weight:300}
        .lnp-cta{padding:160px 40px;text-align:center;position:relative}
        .cta-bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,var(--accent-soft) 0%,transparent 70%);pointer-events:none}
        .cta-content{position:relative;max-width:800px;margin:0 auto}
        .lnp-cta h2{font-size:clamp(48px,7vw,96px);font-weight:600;letter-spacing:-0.04em;line-height:0.95;margin-bottom:32px}
        .lnp-cta h2 em{font-family:'Instrument Serif',serif;font-weight:400;color:var(--accent);font-style:italic}
        .lnp-cta p{font-size:19px;color:var(--muted);margin-bottom:40px}
        .lnp-footer{padding:60px 40px 30px;border-top:1px solid var(--line);background:var(--bg)}
        .footer-content{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-bottom:60px}
        .footer-brand{font-size:32px;font-family:'Instrument Serif',serif;font-weight:400;margin-bottom:12px;letter-spacing:-0.02em}
        .footer-brand em{color:var(--accent);font-style:italic}
        .footer-tagline{color:var(--muted);font-size:14px;max-width:280px;line-height:1.6}
        .footer-col h4{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:18px}
        .footer-col ul{list-style:none}
        .footer-col li{margin-bottom:10px}
        .footer-col a{color:var(--ink);text-decoration:none;font-size:14px;transition:color 0.2s}
        .footer-col a:hover{color:var(--accent)}
        .footer-bottom{max-width:1280px;margin:0 auto;padding-top:30px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted)}
      `}</style>
      <div className="lnp">
        <nav className="lnp-nav">
          <Link href="/"><img src="/logo-light.jpg" alt="linenotpaid" /></Link>
          <ul className="lnp-nav-links">
            <li><a href="#categories">لمن المنصة</a></li>
            <li><a href="#how">كيف يشتغل</a></li>
            <li><a href="#dashboard">الداشبورد</a></li>
            <li><a href="#pricing">الأسعار</a></li>
          </ul>
          <div className="lnp-nav-cta">
            <Link href="/auth" className="btn btn-ghost">دخول</Link>
            <Link href="/auth" className="btn btn-dark">ابدأ مجاناً</Link>
          </div>
        </nav>
        <section className="lnp-hero">
          <div className="hero-grid-bg"></div>
          <div className="hero-content">
            <div className="hero-badge"><span className="dot"></span><span>الإصدار الجديد متاح الآن — V2.0</span></div>
            <h1>أي مناسبة،<br/><span className="accent-text">حضور حقيقي</span>،<br/>الكل <span className="accent-text">يربح</span>.</h1>
            <p>أول منصة سعودية تربط المنظّمين بالحضور. سواء كنت <strong style={{color:"var(--ink)"}}>مطعم</strong>، <strong style={{color:"var(--ink)"}}>شركة</strong>، أو حتى <strong style={{color:"var(--ink)"}}>عريس يبي يعمّر مجلسه</strong> — اطرح فعاليتك واجمع الناس بمكافآت تستحق.</p>
            <div className="hero-actions">
              <Link href="/auth" className="btn btn-primary">أنشئ فعالية</Link>
              <a href="#" className="btn btn-secondary">تنزيل التطبيق</a>
            </div>
            <div className="hero-stats">
              {[{num:"47",label:"منظّم نشط"},{num:"1.2K",label:"حضور موثّق"},{num:"91%",label:"نسبة الإكمال"},{num:"8.4K",label:"ريال وُزِّع"}].map((s,i)=>(
                <div key={i} className="stat-cell"><div className="stat-num">{s.num}<span className="plus">+</span></div><div className="stat-label">{s.label}</div></div>
              ))}
            </div>
          </div>
        </section>
        <section className="section" id="categories">
          <div className="section-label">لمن المنصة</div>
          <h2 className="section-title">منصة <em style={{fontFamily:"Instrument Serif,serif",fontWeight:400,fontStyle:"italic"}}>واحدة</em>،<br/>ثلاث فئات.</h2>
          <p className="section-subtitle">سواء كنت صاحب مشروع، شركة كبيرة، أو شخص يبي يحضر مناسبته الخاصة — منصتنا مفتوحة للكل.</p>
          <div className="categories">
            <div className="category-card">
              <div className="category-tag">— التجار</div>
              <div className="category-illustration"><div className="category-icon-bg"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3h18l-2 13H5L3 3z"/><path d="M3 3L2 0M16 21a1 1 0 100-2 1 1 0 000 2zM9 21a1 1 0 100-2 1 1 0 000 2z"/></svg></div></div>
              <h3>للـ <em>تجار</em></h3>
              <p>مطاعم، كافيهات، متاجر، صالونات. اجذب زبائن جدد في الأوقات الميتة وحوّل الزحمة الوهمية إلى مبيعات حقيقية.</p>
              <ul className="category-examples"><li>مطعم يبي يعمّر طاولاته يوم الثلاثاء</li><li>كافيه جديد يبي تجربة افتتاح قوية</li><li>متجر ملابس يبي يطلق تشكيلة جديدة</li><li>صالون يبي يعرّف على خدمة جديدة</li></ul>
            </div>
            <div className="category-card dark">
              <div className="category-tag">— الشركات</div>
              <div className="category-illustration"><div className="category-icon-bg"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21h18M5 21V7l7-4 7 4v14"/></svg></div></div>
              <h3>للـ <em>شركات</em></h3>
              <p>افتتاحات، مؤتمرات، إطلاق منتجات، حملات تسويقية. اجمع جمهور مستهدف وقابل للتحويل بدل الإعلانات الباردة.</p>
              <ul className="category-examples"><li>افتتاح فرع جديد يبي زحمة لليوم الأول</li><li>إطلاق منتج جديد ويبي تغطية جماهيرية</li><li>مؤتمر أو ورشة عمل تبي حضور نوعي</li><li>حملة CSR تبي مشاركة مجتمعية</li></ul>
            </div>
            <div className="category-card">
              <div className="category-tag">— الأفراد</div>
              <div className="category-illustration"><div className="category-icon-bg"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg></div></div>
              <h3>للـ <em>أفراد</em></h3>
              <p>زواج، خطوبة، تخرّج، حفلة، أو أي مناسبة شخصية. اجمع المعازيم واضمن حضورهم بطريقة عصرية.</p>
              <ul className="category-examples"><li>عريس يبي يعمّر مجلسه ليلة الزواج</li><li>متخرّج يبي يجمع زملاءه للاحتفال</li><li>حفلة عيد ميلاد أو لمّة عائلية</li><li>مناسبة خاصة تبيها ما تنُسى</li></ul>
            </div>
          </div>
        </section>
        <section className="section" id="how">
          <div className="section-label">طريقة العمل</div>
          <h2 className="section-title">ثلاث خطوات. <em style={{fontFamily:"Instrument Serif,serif",fontWeight:400,fontStyle:"italic"}}>صفر تعقيد.</em></h2>
          <p className="section-subtitle">من إنشاء الفعالية إلى توزيع المكافآت — كل شي يتم في دقايق.</p>
          <div className="steps">
            {[{num:"01",title:"المنظّم ينشئ فعالية",desc:"سواء كنت تاجر، شركة، أو فرد — اختر نوع الفعالية، حدد عدد الحضور، المكافأة، والوقت."},{num:"02",title:"الزبون يسجّل ويحضر",desc:"يكتشف الفعاليات القريبة منه، يسجّل بضغطة، يحضر للموقع، ويثبت حضوره برمز QR."},{num:"03",title:"الكل يربح",desc:"المنظّم حصل على حضور حقيقي، والزبون أخذ نقاط ومكافآت قابلة للاستبدال."}].map((s,i)=>(
              <div key={i} className="step"><div className="step-num">{s.num}</div><h3 className="step-title">{s.title}</h3><p className="step-desc">{s.desc}</p></div>
            ))}
          </div>
        </section>
        <section className="dashboard-section" id="dashboard">
          <div className="dashboard-section-inner">
            <div className="section-label">داشبورد المنظّم</div>
            <h2 className="section-title">تحكم كامل،<br/><em style={{fontFamily:"Instrument Serif,serif",fontWeight:400,fontStyle:"italic"}}>رؤية أعمق.</em></h2>
            <p className="section-subtitle">داشبورد مصمم للجميع — تاجر، شركة، أو منظّم مناسبة.</p>
            <div className="dashboard-mockup">
              <div className="mockup-header"><div className="mockup-dot r"></div><div className="mockup-dot y"></div><div className="mockup-dot g"></div><div className="mockup-url">linenotpaid.com/merchant</div></div>
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  <div className="mockup-brand"><div className="mockup-brand-name">linenotpaid</div></div>
                  {["لوحة التحكم","الفعاليات","الحضور","التحليلات","المكافآت"].map((item,i)=>(
                    <div key={i} className={"mockup-nav-item"+(i===0?" active":"")}>{item}</div>
                  ))}
                </div>
                <div className="mockup-content">
                  <div className="mockup-page-title">مرحباً، فعالية الافتتاح الكبير</div>
                  <div className="mockup-page-sub">إليك نظرة على أدائك خلال آخر 30 يوم</div>
                  <div className="mockup-stats">
                    {[{l:"إجمالي الحضور",v:"1,247",t:"↗ +24%"},{l:"فعاليات نشطة",v:"8",t:"↗ +3 جديدة"},{l:"نقاط موزّعة",v:"125,400",t:"↗ +18%"},{l:"نسبة الإكمال",v:"94%",t:"↗ +5%"}].map((s,i)=>(
                      <div key={i} className="mockup-stat"><div className="mockup-stat-label">{s.l}</div><div className="mockup-stat-value">{s.v}</div><div className="mockup-stat-trend">{s.t}</div></div>
                    ))}
                  </div>
                  <div className="mockup-chart">
                    <div className="mockup-chart-title"><span>الحضور خلال آخر 7 أيام</span><small style={{color:"#666",fontSize:11}}>تحديث تلقائي</small></div>
                    <svg width="100%" height="140" viewBox="0 0 600 140" preserveAspectRatio="none">
                      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2B7FFF" stopOpacity="0.4"/><stop offset="100%" stopColor="#2B7FFF" stopOpacity="0"/></linearGradient></defs>
                      <path d="M 0 100 L 86 80 L 172 90 L 257 60 L 343 70 L 429 35 L 514 50 L 600 25 L 600 140 L 0 140 Z" fill="url(#g)"/>
                      <path d="M 0 100 L 86 80 L 172 90 L 257 60 L 343 70 L 429 35 L 514 50 L 600 25" fill="none" stroke="#2B7FFF" strokeWidth="2"/>
                      <circle cx="600" cy="25" r="4" fill="#2B7FFF"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="split-section" id="users">
          <div className="split-half">
            <div className="split-tag">للمنظّم</div>
            <h3 className="split-h">حضور حقيقي بـ<em style={{fontFamily:"Instrument Serif,serif",fontWeight:400,fontStyle:"italic"}}> صفر</em> قلق.</h3>
            <p style={{color:"var(--muted)",fontSize:16}}>من المطعم اللي يبي يعمّر طاولاته، للشركة اللي تبي افتتاح ناجح — منصتنا تضمن لك الحضور.</p>
            <ul className="split-list">{["حضور موثّق برمز QR","قاعدة بيانات للحاضرين","استهداف جغرافي دقيق","تقارير وإحصائيات شاملة","إدارة سهلة من الجوال"].map((item,i)=><li key={i}>{item}</li>)}</ul>
          </div>
          <div className="split-half dark">
            <div className="split-tag">للحاضر</div>
            <h3 className="split-h">اكتشف، احضر، <em style={{fontFamily:"Instrument Serif,serif",fontWeight:400,fontStyle:"italic"}}>اكسب.</em></h3>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:16}}>اكتشف فعاليات قريبة منك واحضر، وكل حضور يجيب لك مكافأة.</p>
            <ul className="split-list">{["فعاليات حصرية في منطقتك","أكل ومشاريب مجانية","نقاط قابلة للاستبدال","دعم المناسبات الاجتماعية","تجربة تشاركية مع الأصدقاء"].map((item,i)=><li key={i}>{item}</li>)}</ul>
          </div>
        </section>
        <section className="lnp-cta">
          <div className="cta-bg"></div>
          <div className="cta-content">
            <h2>ابدأ <em>الآن</em>،<br/>الفرص ما تنتظر.</h2>
            <p>سجّل مشروعك في أقل من دقيقتين. أول 30 يوم مجاناً، بدون التزامات.</p>
            <div className="hero-actions" style={{justifyContent:"center"}}>
              <Link href="/auth" className="btn btn-primary">سجّل مشروعك</Link>
              <a href="#" className="btn btn-secondary">تواصل معنا</a>
            </div>
          </div>
        </section>
        <footer className="lnp-footer">
          <div className="footer-content">
            <div><div className="footer-brand">line<em>not</em>paid</div><p className="footer-tagline">حلقة الوصل بين كل من ينظّم فعالية وكل من يبي يحضر — تجار، شركات، وأفراد.</p></div>
            <div className="footer-col"><h4>المنتج</h4><ul>{["للتجار","للشركات","للأفراد","الأسعار"].map((i,k)=><li key={k}><a href="#">{i}</a></li>)}</ul></div>
            <div className="footer-col"><h4>الشركة</h4><ul>{["من نحن","المدوّنة","الوظائف","تواصل معنا"].map((i,k)=><li key={k}><a href="#">{i}</a></li>)}</ul></div>
            <div className="footer-col"><h4>قانوني</h4><ul>{["الشروط والأحكام","الخصوصية","ملفات الارتباط"].map((i,k)=><li key={k}><a href="#">{i}</a></li>)}</ul></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Line Not Paid. كل الحقوق محفوظة.</span><span style={{fontFamily:"JetBrains Mono,monospace"}}>صُنع في 🇸🇦</span></div>
        </footer>
      </div>
    </>
  )
}