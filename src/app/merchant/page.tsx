'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MerchantDashboard() {
  const [page, setPage] = useState('home')

  const stats = [
    {label:'إجمالي الفعاليات',value:'12',icon:'🎯',color:'#2B7FFF'},
    {label:'إجمالي الحضور',value:'1,240',icon:'👥',color:'#7C3AED'},
    {label:'المكافآت الموزّعة',value:'4,800 ر.س',icon:'💰',color:'#059669'},
    {label:'معدل الحضور',value:'87%',icon:'📈',color:'#F59E0B'},
  ]

  const events = [
    {id:1,title:'عرض الفطور المجاني',date:'2026-05-10',time:'08:00',location:'الرياض، حي النخيل',attendees:87,max:100,reward:10,status:'active'},
    {id:2,title:'قهوة الصباح المميزة',date:'2026-06-12',time:'07:00',location:'جدة، الكورنيش',attendees:22,max:50,reward:15,status:'active'},
    {id:3,title:'إفطار رمضاني',date:'2026-04-01',time:'18:30',location:'الرياض، العليا',attendees:150,max:150,reward:20,status:'ended'},
  ]

  const sidebar = [
    {id:'home',icon:'🏠',label:'الرئيسية'},
    {id:'events',icon:'🎯',label:'الفعاليات'},
    {id:'create',icon:'➕',label:'إنشاء فعالية'},
    {id:'attendees',icon:'👥',label:'الحضور'},
    {id:'rewards',icon:'💰',label:'المكافآت'},
    {id:'settings',icon:'⚙️',label:'الإعدادات'},
  ]

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#F5F5F3',direction:'rtl',fontFamily:'sans-serif'}}>
      {/* Sidebar */}
      <div style={{width:220,background:'white',borderLeft:'1px solid #E8E8E4',display:'flex',flexDirection:'column',position:'fixed',top:0,right:0,bottom:0,zIndex:50}}>
        <div style={{padding:'24px 20px',borderBottom:'1px solid #E8E8E4'}}>
          <img src="/logo-light.jpg" alt="linenotpaid" style={{height:40,width:'auto',mixBlendMode:'multiply'}} />
        </div>
        <div style={{padding:'12px 8px',flex:1}}>
          {sidebar.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',background:page===item.id?'#EEF4FF':'transparent',color:page===item.id?'#2B7FFF':'#444',fontSize:14,fontWeight:page===item.id?600:400,marginBottom:4,textAlign:'right'}}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{padding:'16px 20px',borderTop:'1px solid #E8E8E4'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'#EEF4FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>👤</div>
            <div><div style={{fontSize:13,fontWeight:600,color:'#0A0A0A'}}>أحمد العلي</div><div style={{fontSize:11,color:'#888'}}>تاجر مميز</div></div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{marginRight:220,flex:1,padding:'32px'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
          <div><h1 style={{fontSize:24,fontWeight:700,color:'#0A0A0A',marginBottom:4}}>مرحباً، أحمد 👋</h1><p style={{color:'#888',fontSize:14}}>إليك ملخص نشاطك اليوم</p></div>
          <button onClick={()=>setPage('create')} style={{padding:'10px 20px',borderRadius:10,background:'#2B7FFF',color:'white',border:'none',fontSize:14,fontWeight:600,cursor:'pointer'}}>+ إنشاء فعالية</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:32}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'white',borderRadius:16,padding:20,border:'1px solid #E8E8E4'}}>
              <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
              <div style={{fontSize:12,color:'#888'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Events */}
        <div style={{background:'white',borderRadius:16,border:'1px solid #E8E8E4',overflow:'hidden'}}>
          <div style={{padding:'20px 24px',borderBottom:'1px solid #E8E8E4',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{fontSize:16,fontWeight:700,color:'#0A0A0A'}}>الفعاليات الأخيرة</h2>
            <button onClick={()=>setPage('events')} style={{fontSize:13,color:'#2B7FFF',background:'none',border:'none',cursor:'pointer'}}>عرض الكل</button>
          </div>
          <div style={{padding:'0 24px'}}>
            {events.map((ev,i)=>(
              <div key={i} style={{padding:'16px 0',borderBottom:i<events.length-1?'1px solid #F0F0EE':'none',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'#EEF4FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🎯</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:'#0A0A0A',marginBottom:2}}>{ev.title}</div>
                    <div style={{fontSize:12,color:'#888'}}>{ev.date} · {ev.location}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:24}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#0A0A0A'}}>{ev.attendees}/{ev.max}</div>
                    <div style={{fontSize:11,color:'#888'}}>حاضر</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#059669'}}>{ev.reward} ر.س</div>
                    <div style={{fontSize:11,color:'#888'}}>مكافأة</div>
                  </div>
                  <div style={{padding:'4px 10px',borderRadius:100,background:ev.status==='active'?'#ECFDF5':'#F5F5F5',color:ev.status==='active'?'#059669':'#888',fontSize:11,fontWeight:600}}>
                    {ev.status==='active'?'نشط':'منتهي'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Event Form */}
        {page==='create'&&(
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'white',borderRadius:20,padding:32,width:480,maxHeight:'80vh',overflowY:'auto'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
                <h2 style={{fontSize:18,fontWeight:700,color:'#0A0A0A'}}>إنشاء فعالية جديدة</h2>
                <button onClick={()=>setPage('home')} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:'#888'}}>✕</button>
              </div>
              {[{label:'اسم الفعالية',type:'text',placeholder:'مثال: عرض الفطور المجاني'},{label:'الوصف',type:'text',placeholder:'وصف قصير للفعالية'},{label:'التاريخ',type:'date',placeholder:''},{label:'الوقت',type:'time',placeholder:''},{label:'الموقع',type:'text',placeholder:'مثال: الرياض، حي النخيل'},{label:'الحد الأقصى للحضور',type:'number',placeholder:'مثال: 100'},{label:'قيمة المكافأة (ر.س)',type:'number',placeholder:'مثال: 15'}].map((f,i)=>(
                <div key={i} style={{marginBottom:16}}>
                  <label style={{display:'block',fontSize:13,fontWeight:600,color:'#444',marginBottom:6}}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #E8E8E4',fontSize:14,outline:'none',boxSizing:'border-box'}} />
                </div>
              ))}
              <button style={{width:'100%',padding:'12px',borderRadius:10,background:'#2B7FFF',color:'white',border:'none',fontSize:15,fontWeight:600,cursor:'pointer',marginTop:8}}>إنشاء الفعالية</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}