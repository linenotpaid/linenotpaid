'use client'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const path = usePathname()
  
  const tabs = [
    { href:'/', icon:'🏠', label:'اكتشف' },
    { href:'/wallet', icon:'💰', label:'محفظتي' },
    { href:'/profile', icon:'👤', label:'حسابي' },
  ]

  return (
    <div style={{
      position:'fixed',bottom:0,left:0,right:0,
      height:72,background:'rgba(250,250,247,0.96)',
      backdropFilter:'blur(20px)',borderTop:'1px solid #E5E4DE',
      display:'flex',alignItems:'center',padding:'0 4px',
      fontFamily:'sans-serif',direction:'rtl',zIndex:50,
      paddingBottom:'env(safe-area-inset-bottom,0px)'
    }}>
      {tabs.map(tab => (
        <a key={tab.href} href={tab.href} style={{
          flex:1,display:'flex',flexDirection:'column',
          alignItems:'center',gap:3,padding:'6px 4px',
          textDecoration:'none',transition:'all 0.15s'
        }}>
          <div style={{
            width:34,height:34,borderRadius:9,
            background: path===tab.href ? '#0A0A0A' : 'transparent',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:18
          }}>
            {tab.icon}
          </div>
          <span style={{
            fontSize:10,fontWeight: path===tab.href ? 600 : 500,
            color: path===tab.href ? '#0A0A0A' : '#B0B0AA'
          }}>
            {tab.label}
          </span>
        </a>
      ))}
    </div>
  )
}
