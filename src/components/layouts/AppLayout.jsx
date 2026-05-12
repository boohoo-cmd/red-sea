import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuth } from '@/context/AuthContext'

export function AppLayout() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg-page)' }}>
      <Sidebar />
      <main style={{ flex:1, overflow:'auto', minWidth:0 }}>
        <Outlet />
      </main>
    </div>
  )
}

export function ProtectedRoute({ roles, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  return children
}
