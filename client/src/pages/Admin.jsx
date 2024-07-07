import React from 'react'
import SidebarAdmin from '../components/Admin/SidebarAdmin'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="flex min-h-[90vh] m-0 p-0 bg-gray-100">
    <div className="flex-[1] pr-4">
      <SidebarAdmin />
    </div>
    <div className="flex-[6] flex flex-col gap-y-2">
      <Outlet />
    </div>
  </div>
  )
}

export default Admin
