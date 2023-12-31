import React from 'react'
import { Navbar } from '@/app/[locale]/(platform)/(dashboard)/_components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default DashboardLayout
