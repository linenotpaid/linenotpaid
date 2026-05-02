'use client'

export default function ProfilePage() {
  const menuSections = [
    {
      section: 'الحساب',
      items: [
        { icon: '👤', label: 'تعديل الملف الشخصي', action: '' },
        { icon: '🏦', label: 'بيانات التحويل البنكي', action: '/wallet' },
        { icon: '🔔', label: 'الإشعارات', action: '' },
      ]
    },
    {
      section: 'الأداء',
      items: [
        { icon: '📊', label: 'إحصائياتي', action: '/wallet' },
        { icon: '🎯', label: 'فعالياتي', action: '/' },
      ]
    },
    {
      section: 'أخرى',
      items: [
        { icon: '❓', label: 'مركز المساعدة', action: '' },
        { icon: '📋', label: 'الشروط والخصوصية', action: '' },
        { icon: '🚪', label: 'تسجيل الخروج', action: '/auth', isRed: true },
      ]
    },
  ]

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      <div style={{background:'#0A0A0A',padding:'52px 20px 28px',textAlign:'center'}}>
        <div style={{width:76,height:76,background:'linear-gradient(135deg,#2B7FFF,#10B981)',borderRadius:'50%',margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'white'}}>م</div>
        <div style={{fontSize:20,fontWeight:600,color:'white',marginBottom:4}}>محمد العتيبي</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:14,fontFamily:'monospace'}}>m.alotaibi@email.com</div>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:100,padding:'5px 14px'}}>
          <span style={{fontSize:12,color:'rgba(255,255,255,0.6)'}}>المستوى:</span>
          <span style={{fontSize:12,fontWeight:600,color:'#F59E0B'}}>⭐ ذهبي</span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',background:'#F2F1EC',borderBottom:'1px solid #E5E4DE'}}>
        {[
          {num:'142', label:'ريال مكتسب', isGreen: true},
          {num:'13', label:'حضور', isGreen: false},
          {num:'94%', label:'قبول', isGreen: false},
        ].map((s,i) => (
          <div key={i} style={{padding:'14px 8px',textAlign:'center',borderLeft: i>0 ? '1px solid #E5E4DE' : 'none'}}>
            <div style={{fontSize:20,fontWeight:600,letterSpacing:'-0.02em',color:s.isGreen?'#10B981':'#0A0A0A',marginBottom:2}}>{s.num}</div>
            <div style={{fontSize:10,color:'#6B6B66',fontFamily:'monospace',letterSpacing:'0.04em'}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{margin:'16px',background:'rgba(43,127,255,0.08)',border:'1px solid rgba(43,127,255,0.2)',borderRadius:12,padding:'14px 16px'}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>ترقّ للباقة المميزة</div>
        <div style={{fontSize:12,color:'#6B6B66',marginBottom:10,lineHeight:1.5}}>احصل على مكافآت مضاعفة وأولوية في التسجيل</div>
        <button onClick={()=>window.location.href='/wallet'}
          style={{width:'100%',height:38,background:'#2B7FFF',color:'white',border:'none',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>
          عرض الباقات
        </button>
      </div>

      <div style={{padding:'0 16px',paddingBottom:100}}>
        {menuSections.map((section, si) => (
          <div key={si} style={{marginBottom:20}}>
            <div style={{fontSize:10,fontFamily:'monospace',letterSpacing:'0.12em',textTransform:'uppercase',color:'#6B6B66',marginBottom:8}}>{section.section}</div>
            <div style={{background:'white',border:'1px solid #E5E4DE',borderRadius:12,overflow:'hidden'}}>
              {section.items.map((item, ii) => (
                <div key={ii}
                  onClick={()=>item.action && (window.location.href=item.action)}
                  style={{
                    display:'flex',alignItems:'center',gap:12,
                    padding:'12px 16px',
                    borderBottom: ii < section.items.length-1 ? '1px solid #E5E4DE' : 'none',
                    cursor:'pointer'
                  }}>
                  <div style={{width:34,height:34,background:'#F2F1EC',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{item.icon}</div>
                  <span style={{flex:1,fontSize:14,fontWeight:500,color:item.isRed?'#EF4444':'#0A0A0A'}}>{item.label}</span>
                  <span style={{color:'#B0B0AA',fontSize:16}}>‹</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
