import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Line Not Paid',
  description: 'احضر، صوّر، واكسب فلوس',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{margin:0,padding:0}}>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
