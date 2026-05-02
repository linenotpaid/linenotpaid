'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Event {
  id: string
  title: string
  description: string
  type: string
  city: string
  district: string
  reward_amount: number
  max_attendees: number
  current_attendees: number
  event_date: string
  event_time: string
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'white',fontSize:18}}>جاري التحميل...</p>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      {/* Header */}
      <div style={{background:'#0A0A0A',padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'white',borderRadius:'50%'}}></div>
          <span style={{color:'white',fontWeight:700,fontSize:16}}>linenotpaid</span>
        </div>
        <a href="/auth" style={{background:'#2B7FFF',color:'white',padding:'8px 16px',borderRadius:8,textDecoration:'none',fontSize:13,fontWeight:600}}>دخول</a>
      </div>

      {/* Hero */}
      <div style={{background:'#0A0A0A',padding:'40px 24px 48px',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:32,fontWeight:700,marginBottom:8,lineHeight:1.2}}>
          احضر، صوّر،<br/>
          <span style={{color:'#2B7FFF'}}>واكسب فلوس</span>
        </h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:15,marginBottom:0}}>
          سجّل في الفعاليات القريبة منك واكسب مكافآت حقيقية
        </p>
      </div>

      {/* Events */}
      <div style={{padding:'24px 16px',maxWidth:600,margin:'0 auto'}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:16}}>
          الفعاليات المتاحة ({events.length})
        </h2>

        {events.length === 0 ? (
          <p style={{color:'#6B6B66',textAlign:'center',padding:'40px 0'}}>لا توجد فعاليات متاحة حالياً</p>
        ) : (
          events.map(event => (
            <div key={event.id} style={{
              background:'white',border:'1px solid #E5E4DE',
              borderRadius:16,marginBottom:14,overflow:'hidden',
              cursor:'pointer'
            }}
            onClick={() => window.location.href = `/events/${event.id}`}
            >
              {/* Card Header */}
              <div style={{
                background: event.type === 'restaurant' ? 'linear-gradient(135deg,#E65100,#FF8F00)' : 'linear-gradient(135deg,#1B2838,#2C3E50)',
                padding:'20px 16px',
                display:'flex',alignItems:'flex-end',justifyContent:'space-between'
              }}>
                <span style={{color:'white',fontWeight:700,fontSize:18}}>{event.title}</span>
                <div style={{background:'rgba(0,0,0,0.4)',color:'white',padding:'6px 12px',borderRadius:100,backdropFilter:'blur(8px)'}}>
                  <span style={{color:'#4ADE80',fontWeight:700,fontSize:16}}>+{event.reward_amount} ريال</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{padding:'14px 16px'}}>
                <p style={{color:'#6B6B66',fontSize:13,marginBottom:12}}>{event.description}</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
                  <span style={{background:'#F2F1EC',color:'#6B6B66',padding:'4px 10px',borderRadius:100,fontSize:11}}>
                    📍 {event.city}، {event.district}
                  </span>
                  <span style={{background:'#F2F1EC',color:'#6B6B66',padding:'4px 10px',borderRadius:100,fontSize:11}}>
                    📅 {event.event_date}
                  </span>
                  <span style={{background:'#F2F1EC',color:'#6B6B66',padding:'4px 10px',borderRadius:100,fontSize:11}}>
                    ⏰ {event.event_time}
                  </span>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{flex:1,background:'#F2F1EC',borderRadius:100,height:6,marginLeft:12,overflow:'hidden'}}>
                    <div style={{
                      width:`${(event.current_attendees/event.max_attendees)*100}%`,
                      height:'100%',
                      background:'linear-gradient(90deg,#2B7FFF,#10B981)',
                      borderRadius:100
                    }}></div>
                  </div>
                  <span style={{fontSize:11,color:'#6B6B66',whiteSpace:'nowrap'}}>
                    {event.current_attendees}/{event.max_attendees}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
