'use client'
import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

export default function BottomNavWrapper() {
  const pathname = usePathname()
  const hideOn = [
    '/merchant/new-event',
    '/admin/new-event',
    '/admin/proofs',
    '/admin',
    '/merchant',
  ]
  if (hideOn.some(path => pathname.startsWith(path))) return null
  return <BottomNav />
}
