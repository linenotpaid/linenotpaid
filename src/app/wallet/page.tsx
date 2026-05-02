'use client'
import { useState } from 'react'

const transactions = [
  {id:1, name:'عرض الفطور المجاني', date:'اليوم، 3:48 م', amount:10, type:'in'},
  {id:2, name:'قهوة الصباح المميزة', date:'الأحد، 28 أبريل', amount:15, type:'in'},
  {id:3, name:'تحويل لحساب البنك', date:'الخميس، 25 أبريل', amount:100, type:'out'},
  {id:4, name:'برجر الجمعة', date:'الجمعة، 19 أبريل', amount:20, type:'in'},
  {id:5, name:'افتتاح إكسترا', date:'السبت، 13 أبريل', amount:30, type:'in'},
]

export default function WalletPage() {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [iban, setIban] = useState('')
  const [amount, setAmount] = useState('')
  const [done, setDone] = useState(false)
  const balance = 142

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',direction:'rtl'}}>
      {/* Header */}
      <div style={{background:'#0A0A0A',padding:'52px 20px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>window.history.back()}
          style={{width:34,height:34,background:'rgba(255,255,255,0.1)',border:'none',borderRadius:9,color:'white',fontSize:16,cursor:'pointer'}}>←</button>
        <span style={{color:'white',fontWeight:600,fontSize:16}}>محفظتي</span>
      </div>

      <div style={{padding:'16px',maxWidth:480,margin:'0 auto',paddingBottom:40}}>
        {/* Balance Card */}
        <div style={{background:'linear-gradient(135deg,#0A0A0A,#1A1A2E)',borderRadius:16,padding:24,marginBottom:16,textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>رصيدك الحالي</div>
          <div style={{fontSize:60,fontWeight:700,color:'white',letterSpacing:'-0.04em',lineHeight:1,display:'flex',alignItems:'baseline',justifyContent:'center',gap:8,marginBottom:6}}>
            {balance}
            <span style={{fontStyle:'italic',color:'#10B981',fontSize:28}}>ريال</span>
          </div>
          <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:18}}>من 13 فعالية حضرتها</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <button onClick={()=>setShowWithdraw(true)}
              style={{height:38,background:'#10B981',color:'white',border:'none',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
              💸 تحويل للبنك
            </button>
            <button
              style={{height:38,background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.8)',border:'none',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>
              📄 كشف الحساب
            </button>
          </div>
        </div>

        {/* Packages */}
        <div style={{marginBottom:16}}>
          <h2 style={{fontSize:17,fontWeight:700,marginBottom:12}}>الباقات المميزة</h2>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {name:'مجاني', desc:'للبداية', price:'0', period:'/شهر', features:['جميع الفعاليات','تحويل من 50 ريال'], current:true, accent:'#6B6B66'},
              {name:'بلس', desc:'للمستخدم النشط', price:'29', period:'/شهر', features:['أولوية التسجيل','مكافآت x1.5','تحويل من 20 ريال'], featured:true, accent:'#2B7FFF'},
              {name:'برو', desc:'للمؤثر الجاد', price:'79', period:'/شهر', features:['مكافآت x2','فعاليات VIP حصرية','تحويل فوري'], accent:'#8B5CF6'},
            ].map((pkg,i) => (
              <div key={i} style={{
                background:'white',
                border:`1.5px solid ${pkg.featured?'#2B7FFF':'#E5E4DE'}`,
                borderRadius:14,padding:18,position:'relative',
                background: pkg.featured ? 'linear-gradient(135deg,white,rgba(43,127,255,0.03))' : 'white'
              }}>
                {pkg.featured && (
                  <div style={{position:'absolute',top:-10,right:16,background:'#2B7FFF',color:'white',fontSize:10,padding:'4px 10px',borderRadius:100}}>
                    الأكثر شعبية
                  </div>
                )}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12,paddingBottom:12,borderBottom:'1px solid #E5E4DE'}}>
                  <div>
                    <div style={{fontSize:15,fontWeight:600}}>{pkg.name}</div>
                    <div style={{fontSize:12,color:'#6B6B66'}}>{pkg.desc}</div>
                  </div>
                  <div style={{textAlign:'left'}}>
                    <span style={{fontSize:28,fontWeight:700}}>{pkg.price}</span>
                    <span style={{fontStyle:'italic',color:pkg.accent,fontSize:16}}> ر</span>
                    <span style={{fontSize:11,color:'#6B6B66'}}>{pkg.period}</span>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  {pkg.features.map((f,j) => (
                    <div key={j} style={{fontSize:13,display:'flex',alignItems:'center',gap:8,marginBottom:6,color:'#0A0A0A'}}>
                      <span style={{width:5,height:5,background:'#10B981',borderRadius:'50%',flexShrink:0,display:'inline-block'}}></span>
                      {f}
                    </div>
                  ))}
                </div>
                <button style={{
                  width:'100%',height:40,
                  background: pkg.current ? 'transparent' : pkg.featured ? '#2B7FFF' : '#0A0A0A',
                  color: pkg.current ? '#6B6B66' : 'white',
                  border: pkg.current ? '1px solid #E5E4DE' : 'none',
                  borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'
                }}>
                  {pkg.current ? 'باقتك الحالية' : 'اشترك الآن'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <h2 style={{fontSize:17,fontWeight:700,marginBottom:12}}>آخر المعاملات</h2>
        <div style={{background:'white',border:'1px solid #E5E4DE',borderRadius:14,overflow:'hidden'}}>
          {transactions.map((tx,i) => (
            <div key={tx.id} style={{
              display:'flex',alignItems:'center',gap:12,padding:'12px 16px',
              borderBottom: i < transactions.length-1 ? '1px solid #E5E4DE' : 'none'
            }}>
              <div style={{
                width:36,height:36,borderRadius:9,
                background: tx.type==='in' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0
              }}>
                <span style={{fontSize:16}}>{tx.type==='in' ? '📥' : '📤'}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,marginBottom:1}}>{tx.name}</div>
                <div style={{fontSize:11,color:'#6B6B66'}}>{tx.date}</div>
              </div>
              <div style={{
                fontWeight:700,fontSize:14,
                color: tx.type==='in' ? '#10B981' : '#EF4444'
              }}>
                {tx.type==='in' ? '+' : '-'}{tx.amount} ر
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',display:'flex',alignItems:'flex-end',zIndex:100}}
          onClick={e=>{if(e.target===e.currentTarget)setShowWithdraw(false)}}>
          <div style={{background:'white',borderRadius:'24px 24px 0 0',padding:'24px 24px 36px',width:'100%',fontFamily:'sans-serif',direction:'rtl'}}>
            <div style={{width:34,height:4,background:'#E5E4DE',borderRadius:2,margin:'0 auto 18px'}}></div>
            {done ? (
              <div style={{textAlign:'center',padding:'20px 0'}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>تم إرسال طلب التحويل</h3>
                <p style={{color:'#6B6B66',fontSize:13,marginBottom:20}}>سيصلك المبلغ خلال 24 ساعة</p>
                <button onClick={()=>{setShowWithdraw(false);setDone(false)}}
                  style={{width:'100%',padding:14,background:'#0A0A0A',color:'white',border:'none',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer'}}>
                  تم
                </button>
              </div>
            ) : (
              <>
                <h2 style={{fontSize:18,fontWeight:700,marginBottom:4}}>تحويل للبنك</h2>
                <p style={{fontSize:13,color:'#6B6B66',marginBottom:20}}>رصيدك المتاح: <strong style={{color:'#10B981'}}>{balance} ريال</strong></p>
                <div style={{marginBottom:12}}>
                  <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>المبلغ</label>
                  <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
                    placeholder="100" min="50" max={balance}
                    style={{width:'100%',padding:'12px 14px',border:'1.5px solid #E5E4DE',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
                </div>
                <div style={{marginBottom:20}}>
                  <label style={{display:'block',fontSize:12,fontWeight:500,marginBottom:6}}>رقم الآيبان</label>
                  <input type="text" value={iban} onChange={e=>setIban(e.target.value)}
                    placeholder="SA00 0000 0000 0000 0000 0000"
                    style={{width:'100%',padding:'12px 14px',border:'1.5px solid #E5E4DE',borderRadius:10,fontSize:14,outline:'none',boxSizing:'border-box'}}/>
                </div>
                <button onClick={()=>{if(amount&&iban)setDone(true)}}
                  style={{width:'100%',padding:14,background:'#10B981',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer'}}>
                  تأكيد التحويل
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
