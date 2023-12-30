import React from 'react'
import { Navbar } from '@/app/(platform)/(dashboard)/_components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default DashboardLayout
