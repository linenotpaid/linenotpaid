'use client'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { use } from 'react'

export default function ScanPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const supabase = createClient()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<any>(null)
  const [session, setSession] = useState<any>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [scansCount, setScansCount] = useState(0)

  useEffect(() => {
    fetchSession()
    return () => stopCamera()
  }, [])

  async function fetchSession() {
    const { data } = await supabase
      .from('scan_sessions')
      .select('*, events(title, event_date, location)')
      .eq('token', token)
      .eq('is_active', true)
      .single()

    if (!data) { setError('الجلسة غير موجودة أو منتهية'); return }
    setSession(data)
    setScansCount(data.scans_count || 0)
    startCamera()
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)
        startScanning()
      }
    } catch (e) {
      setError('تعذر الوصول للكاميرا — تأكد من إذن الكاميرا')
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(t => t.stop())
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  function startScanning() {
    intervalRef.current = setInterval(scanFrame, 500)
  }

  async function scanFrame() {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx || video.readyState !== 4) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    try {
      // @ts-ignore
      const { BarcodeDetector } = window
      if (!BarcodeDetector) return
      const detector = new BarcodeDetector({ formats: ['qr_code'] })
      const codes = await detector.detect(canvas)
      if (codes.length > 0) {
        clearInterval(intervalRef.current)
        await processQR(codes[0].rawValue)
      }
    } catch (e) {}
  }

  async function processQR(qrValue: string) {
    setLoading(true)
    try {
      const data = JSON.parse(qrValue)
      const { userId, eventId } = data

      if (!userId || !eventId) {
        setError('QR غير صالح')
        restartScan()
        return
      }

      // تحقق أن الفعالية تطابق الجلسة
      if (session?.event_id !== eventId) {
        setResult({ type: 'wrong_event' })
        restartScan()
        return
      }

      const { data: attendee } = await supabase
        .from('attendees')
        .select('*, profiles(full_name, email), events(title)')
        .eq('user_id', userId)
        .eq('event_id', eventId)
        .single()

      if (!attendee) {
        setResult({ type: 'not_registered' })
        restartScan()
        return
      }

      if (attendee.status === 'attended') {
        setResult({ type: 'already', attendee })
        restartScan()
        return
      }

      // تسجيل الحضور
      await supabase.from('attendees').update({ status: 'attended' }).eq('id', attendee.id)

      // تحديث عداد المسح
      const newCount = scansCount + 1
      await supabase.from('scan_sessions').update({ scans_count: newCount }).eq('token', token)
      setScansCount(newCount)

      setResult({ type: 'success', attendee })
      restartScan()
    } catch (e) {
      setError('خطأ في قراءة الـ QR')
      restartScan()
    } finally {
      setLoading(false)
    }
  }

  function restartScan() {
    setTimeout(() => {
      setResult(null)
      setError('')
      startScanning()
    }, 3000)
  }

  if (error && !session) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <p style={{ fontSize: 48, margin: '0 0 16px' }}>❌</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: 'system-ui', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ background: '#1A1A1A', borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#F5A623', fontSize: 13, fontWeight: 700 }}>🔢 {scansCount} مسح</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 16, margin: 0 }}>{session?.label}</p>
            <p style={{ color: '#2B7FFF', fontSize: 13, margin: 0 }}>🎯 {session?.events?.title}</p>
          </div>
        </div>
      </div>

      {/* Camera */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 16 }}>

        <div style={{ position: 'relative', width: '100%', maxWidth: 360, borderRadius: 20, overflow: 'hidden', border: `2px solid ${result?.type === 'success' ? '#22C55E' : result?.type === 'already' ? '#F5A623' : result ? '#EF4444' : '#2B7FFF'}` }}>
          <video ref={videoRef} style={{ width: '100%', display: 'block' }} muted playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: 180, height: 180, border: '3px solid #2B7FFF', borderRadius: 16, boxShadow: '0 0 0 1000px rgba(0,0,0,0.5)' }} />
          </div>

          {loading && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>⏳ جاري التحقق...</p>
            </div>
          )}
        </div>

        <p style={{ color: '#888', fontSize: 13, textAlign: 'center', margin: 0 }}>وجّه الكاميرا نحو QR العميل</p>

        {/* Result Cards */}
        {result?.type === 'success' && (
          <div style={{ background: '#DCFCE7', borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, textAlign: 'right' }}>
            <p style={{ fontSize: 28, textAlign: 'center', margin: '0 0 12px' }}>✅</p>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#0A0A0A', margin: '0 0 6px' }}>تم تسجيل الحضور!</p>
            <p style={{ color: '#444', margin: '0 0 4px', fontWeight: 600 }}>👤 {result.attendee?.profiles?.full_name}</p>
            <p style={{ color: '#666', fontSize: 13, margin: 0 }}>{result.attendee?.profiles?.email}</p>
          </div>
        )}

        {result?.type === 'already' && (
          <div style={{ background: '#FFF8EE', borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, textAlign: 'right' }}>
            <p style={{ fontSize: 28, textAlign: 'center', margin: '0 0 12px' }}>⚠️</p>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#0A0A0A', margin: '0 0 6px' }}>تم التسجيل مسبقاً</p>
            <p style={{ color: '#444', margin: 0, fontWeight: 600 }}>👤 {result.attendee?.profiles?.full_name}</p>
          </div>
        )}

        {result?.type === 'not_registered' && (
          <div style={{ background: '#FEE2E2', borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <p style={{ fontSize: 28, margin: '0 0 12px' }}>❌</p>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#EF4444', margin: 0 }}>غير مسجل في هذه الفعالية</p>
          </div>
        )}

        {result?.type === 'wrong_event' && (
          <div style={{ background: '#FEE2E2', borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <p style={{ fontSize: 28, margin: '0 0 12px' }}>⛔</p>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#EF4444', margin: 0 }}>QR لفعالية مختلفة</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#FEE2E2', borderRadius: 12, padding: 16, width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <p style={{ color: '#EF4444', margin: 0, fontWeight: 700 }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
