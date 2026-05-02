'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

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

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [registered, setRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [id])

  async function handleRegister() {
    setRegistering(true)
    await new Promise(r => setTimeout(r, 1000))
    setRegistered(true)
    setRegistering(false)
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0A0A0A',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'white'}}>جاري التحميل...</p>
    </div>
  )

  if (!event) return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p>الفعالية غير موجودة</p>
    </div>
  )

  const pct = Math.round((event.current_attendees / event.max_attendees) * 100)

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      {/* Header Image */}
      <div style={{
        height:220,
        background: event.type === 'restaurant'
          ? 'linear-gradient(135deg,#E65100,#FF8F00)'
          : 'linear-gradient(135deg,#1B2838,#2C3E50)',
        position:'relative',
        display:'flex',alignItems:'flex-end',padding:'0 20px 20px'
      }}>
        <button onClick={()=>window.history.back()}
          style={{position:'absolute',top:52,right:16,width:36,height:36,background:'rgba(0,0,0,0.4)',border:'none',borderRadius:9,color:'white',fontSize:18,cursor:'pointer',backdropFilter:'blur(8px)'}}>
          ←
        </button>
        <div style={{background:'rgba(0,0,0,0.5)',borderRadius:12,padding:'10px 14px',backdropFilter:'blur(12px)'}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',marginBottom:2}}>تكسب عند الحضور</div>
          <div style={{fontSize:28,fontWeight:700,color:'#4ADE80'}}>+{event.reward_amount} ريال</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>لكل حضور موثّق</div>
        </div>
      </div>

      {/* Body */}
      <div style={{background:'white',borderRadius:'24px 24px 0 0',marginTop:-20,padding:'24px 20px 140px'}}>
        <h1 style={{fontSize:24,fontWeight:700,marginBottom:6,letterSpacing:'-0.02em'}}>{event.title}</h1>
        <p style={{fontSize:13,color:'#6B6B66',display:'flex',alignItems:'center',gap:4,marginBottom:20}}>
          📍 {event.city}، {event.district}
        </p>

        {/* Info Grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
          {[
            {label:'التاريخ', value:event.event_date},
            {label:'الوقت', value:event.event_time},
            {label:'المكافأة', value:`${event.reward_amount} ريال`, color:'#10B981'},
            {label:'المتاح', value:`${event.max_attendees - event.current_attendees} مكان`, color:'#2B7FFF'},
          ].map((item,i) => (
            <div key={i} style={{background:'#F2F1EC',borderRadius:10,padding:12}}>
              <div style={{fontSize:10,color:'#6B6B66',marginBottom:4,letterSpacing:'0.06em',textTransform:'uppercase'}}>{item.label}</div>
              <div style={{fontSize:16,fontWeight:600,color:item.color||'#0A0A0A'}}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{marginBottom:20}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
            <span>الحضور</span>
            <span style={{color:'#6B6B66'}}>{event.current_attendees} / {event.max_attendees}</span>
          </div>
          <div style={{height:6,background:'#F2F1EC',borderRadius:100,overflow:'hidden'}}>
            <div style={{width:`${pct}%`,height:'100%',background:'linear-gradient(90deg,#2B7FFF,#10B981)',borderRadius:100}}></div>
          </div>
        </div>

        <p style={{fontSize:14,color:'#6B6B66',lineHeight:1.7,marginBottom:20}}>{event.description}</p>

        {/* How to prove */}
        <div style={{marginBottom:20}}>
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:12,display:'flex',alignItems:'center',gap:6}}>
            ✅ كيف تثبت حضورك؟
          </h3>
          {[
            {num:'1', title:'احضر للمكان', desc:'توجّه للموقع في الوقت المحدد'},
            {num:'2', title:'صوّر سناب أو ستوري', desc:'يجب يظهر الموقع أو الفعالية'},
            {num:'3', title:'أرسل الرابط', desc:'انسخ رابط المحتوى وأرسله هنا'},
            {num:'4', title:'استلم مكافأتك', desc:'بعد المراجعة خلال ساعة'},
          ].map((step,i) => (
            <div key={i} style={{display:'flex',gap:12,padding:'10px',background:'#F2F1EC',borderRadius:10,marginBottom:8}}>
              <div style={{width:24,height:24,background:'#0A0A0A',borderRadius:'50%',color:'white',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{step.num}</div>
              <div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{step.title}</div>
                <div style={{fontSize:11,color:'#6B6B66'}}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,padding:'14px 20px 30px',background:'rgba(250,250,247,0.95)',backdropFilter:'blur(16px)',borderTop:'1px solid #E5E4DE'}}>
        {registered ? (
          <div>
            <div style={{background:'#D1FAE5',color:'#10B981',padding:'12px',borderRadius:10,textAlign:'center',fontWeight:600,marginBottom:12}}>
              ✅ تم التسجيل! احضر وأرسل إثباتك
            </div>
            <button
              onClick={()=>window.location.href=`/events/${id}/proof`}
              style={{width:'100%',padding:14,background:'#10B981',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
              رفع إثبات الحضور
            </button>
          </div>
        ) : (
          <button onClick={handleRegister} disabled={registering}
            style={{width:'100%',padding:14,background:'#0A0A0A',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
            {registering ? 'جاري التسجيل...' : 'سجّل في الفعالية'}
          </button>
        )}
      </div>
    </div>
  )
}
