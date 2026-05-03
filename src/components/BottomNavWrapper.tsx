'use client'
import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

export default function BottomNavWrapper() {
  const pathname = usePathname()
  const hideOn = [
    '/merchant/new-event',
    '/admin/new-event',
    '/admin/proofs',
  ]
  if (hideOn.includes(pathname)) return null
  return <BottomNav />
}
