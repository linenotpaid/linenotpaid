'use client'
import { useState } from 'react'

export default function AdminDashboard() {
  const [page, setPage] = useState('home')

  const stats = [
    {label:'إجمالي المستخدمين',value:'2,847',icon:'👥',color:'#2B7FFF',change:'+12%'},
    {label:'الفعاليات النشطة',value:'43',icon:'🎯',color:'#059669',change:'+5%'},
    {label:'الإيراد الشهري',value:'28,400 ر.س',icon:'💰',color:'#7C3AED',change:'+18%'},
    {label:'المكافآت الموزّعة',value:'12,600 ر.س',icon:'🎁',color:'#F59E0B',change:'+8%'},
  ]

  const merchants = [
    {name:'مطعم الأصالة',plan:'Pro',events:8,revenue:2400,status:'active'},
    {name:'كافيه المدينة',plan:'Starter',events:3,revenue:800,status:'active'},
    {name:'شركة النور',plan:'Enterprise',events:24,revenue:8900,status:'active'},
    {name:'بيت الضيافة',plan:'Pro',events:5,revenue:1200,status:'suspended'},
  ]

  const sidebar = [
    {id:'home',icon:'🏠',label:'الرئيسية'},
    {id:'merchants',icon:'🏪',label:'التجار'},
    {id:'users',icon:'👥',label:'المستخدمون'},
    {id:'events',icon:'🎯',label:'الفعاليات'},
    {id:'revenue',icon:'💰',label:'الإيرادات'},
    {id:'settings',icon:'⚙️',label:'الإعدادات'},
  ]

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',direction:'rtl',fontFamily:'sans-serif',color:'white'}}>
      {/* Sidebar */}
      <div style={{width:220,background:'#111',borderLeft:'1px solid #222',display:'flex',flexDirection:'column',position:'fixed',top:0,right:0,bottom:0,zIndex:50}}>
        <div style={{padding:'24px 20px',borderBottom:'1px solid #222',display:'flex',alignItems:'center',gap:10}}>
          <img src="/logo-dark.jpg" alt="linenotpaid" style={{height:36,width:'auto'}} />
          <span style={{fontSize:10,background:'linear-gradient(135deg,#2B7FFF,#7C3AED)',color:'white',padding:'3px 8px',borderRadius:100,fontWeight:700,letterSpacing:'0.05em'}}>ADMIN</span>
        </div>
        <div style={{padding:'12px 8px',flex:1}}>
          {sidebar.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',background:page===item.id?'rgba(43,127,255,0.15)':'transparent',color:page===item.id?'#2B7FFF':'#888',fontSize:14,fontWeight:page===item.id?600:400,marginBottom:4,textAlign:'right'}}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{padding:'16px 20px',borderTop:'1px solid #222'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(43,127,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>👤</div>
            <div><div style={{fontSize:13,fontWeight:600,color:'white'}}>مشرف النظام</div><div style={{fontSize:11,color:'#555'}}>Super Admin</div></div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{marginRight:220,flex:1,padding:'32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
          <div><h1 style={{fontSize:24,fontWeight:700,color:'white',marginBottom:4}}>لوحة الإدارة 🛡️</h1><p style={{color:'#555',fontSize:14}}>مرحباً، هذا ملخص المنصة</p></div>
          <div style={{display:'flex',gap:8}}>
            <button style={{padding:'8px 16px',borderRadius:8,background:'#1a1a1a',color:'#888',border:'1px solid #222',fontSize:13,cursor:'pointer'}}>تصدير التقارير</button>
            <button style={{padding:'8px 16px',borderRadius:8,background:'#2B7FFF',color:'white',border:'none',fontSize:13,cursor:'pointer',fontWeight:600}}>+ إضافة تاجر</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:32}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'#111',borderRadius:16,padding:20,border:'1px solid #222'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <span style={{fontSize:24}}>{s.icon}</span>
                <span style={{fontSize:11,color:'#22C55E',background:'rgba(34,197,94,0.1)',padding:'2px 8px',borderRadius:100}}>{s.change}</span>
              </div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
              <div style={{fontSize:12,color:'#555'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue Sources */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:32}}>
          <div style={{background:'#111',borderRadius:16,border:'1px solid #222',padding:24}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'white',marginBottom:20}}>مصادر الإيراد</h3>
            {[
              {label:'اشتراكات التجار',amount:'12,400 ر.س',pct:44,color:'#2B7FFF'},
              {label:'عمولة 15% على الحملات',amount:'8,900 ر.س',pct:31,color:'#7C3AED'},
              {label:'باقات الأفراد Premium',amount:'4,800 ر.س',pct:17,color:'#059669'},
              {label:'رسوم التسجيل',amount:'2,300 ر.س',pct:8,color:'#F59E0B'},
            ].map((r,i)=>(
              <div key={i} style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:13,color:'#888'}}>{r.label}</span>
                  <span style={{fontSize:13,fontWeight:600,color:'white'}}>{r.amount}</span>
                </div>
                <div style={{height:6,background:'#222',borderRadius:100}}>
                  <div style={{height:'100%',width:`${r.pct}%`,background:r.color,borderRadius:100}}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:'#111',borderRadius:16,border:'1px solid #222',padding:24}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'white',marginBottom:20}}>قائمة المراجعة العاجلة</h3>
            {[
              {text:'4 تجار جدد بانتظار الموافقة',type:'warning',icon:'⏳'},
              {text:'طلب سحب 3,200 ر.س معلّق',type:'error',icon:'🔴'},
              {text:'فعالية مبلّغ عنها بحاجة مراجعة',type:'warning',icon:'⚠️'},
              {text:'تجديد اشتراك شركة النور قريباً',type:'info',icon:'📅'},
            ].map((item,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:i<3?'1px solid #1a1a1a':'none'}}>
                <span style={{fontSize:18}}>{item.icon}</span>
                <span style={{fontSize:13,color:'#888',flex:1}}>{item.text}</span>
                <button style={{fontSize:11,color:'#2B7FFF',background:'none',border:'none',cursor:'pointer'}}>معالجة</button>
              </div>
            ))}
          </div>
        </div>

        {/* Merchants Table */}
        <div style={{background:'#111',borderRadius:16,border:'1px solid #222',overflow:'hidden'}}>
          <div style={{padding:'20px 24px',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15,fontWeight:700,color:'white'}}>أحدث التجار</h3>
            <button onClick={()=>setPage('merchants')} style={{fontSize:13,color:'#2B7FFF',background:'none',border:'none',cursor:'pointer'}}>عرض الكل</button>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{borderBottom:'1px solid #1a1a1a'}}>
              {['التاجر','الباقة','الفعاليات','الإيراد','الحالة','إجراء'].map((h,i)=>(
                <th key={i} style={{padding:'12px 24px',textAlign:'right',fontSize:12,color:'#555',fontWeight:600}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {merchants.map((m,i)=>(
                <tr key={i} style={{borderBottom:i<merchants.length-1?'1px solid #1a1a1a':'none'}}>
                  <td style={{padding:'14px 24px',fontSize:14,color:'white',fontWeight:600}}>{m.name}</td>
                  <td style={{padding:'14px 24px'}}><span style={{fontSize:12,padding:'3px 10px',borderRadius:100,background:m.plan==='Enterprise'?'rgba(124,58,237,0.2)':m.plan==='Pro'?'rgba(43,127,255,0.2)':'rgba(255,255,255,0.05)',color:m.plan==='Enterprise'?'#A78BFA':m.plan==='Pro'?'#60A5FA':'#888'}}>{m.plan}</span></td>
                  <td style={{padding:'14px 24px',fontSize:14,color:'#888'}}>{m.events}</td>
                  <td style={{padding:'14px 24px',fontSize:14,color:'#059669',fontWeight:600}}>{m.revenue} ر.س</td>
                  <td style={{padding:'14px 24px'}}><span style={{fontSize:12,padding:'3px 10px',borderRadius:100,background:m.status==='active'?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)',color:m.status==='active'?'#22C55E':'#EF4444'}}>{m.status==='active'?'نشط':'موقوف'}</span></td>
                  <td style={{padding:'14px 24px'}}><button style={{fontSize:12,color:'#2B7FFF',background:'none',border:'1px solid #2B7FFF',borderRadius:6,padding:'4px 12px',cursor:'pointer'}}>تفاصيل</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}