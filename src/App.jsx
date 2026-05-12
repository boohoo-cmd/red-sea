import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { AppLayout, ProtectedRoute } from '@/components/layouts/AppLayout'
import Login from '@/pages/Login'
import AdminDashboard from '@/pages/AdminDashboard'
import { CoachDashboard, GuardianDashboard, PlayerDashboard, Unauthorized } from '@/pages/Placeholders'

function RootRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  const map = { super_admin:'/admin', coach:'/coach', guardian:'/guardian', player:'/player' }
  return <Navigate to={map[user.role] || '/login'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin */}
          <Route element={<ProtectedRoute roles={['super_admin']}><AppLayout /></ProtectedRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/players"  element={<div style={{padding:32,fontFamily:'var(--font-display)',fontSize:24}}>Players Management — coming next</div>} />
            <Route path="/admin/events"   element={<div style={{padding:32,fontFamily:'var(--font-display)',fontSize:24}}>Events — coming next</div>} />
            <Route path="/admin/comms"    element={<div style={{padding:32,fontFamily:'var(--font-display)',fontSize:24}}>Communications — coming next</div>} />
            <Route path="/admin/badges"   element={<div style={{padding:32,fontFamily:'var(--font-display)',fontSize:24}}>Badges — coming next</div>} />
          </Route>

          {/* Coach */}
          <Route element={<ProtectedRoute roles={['coach']}><AppLayout /></ProtectedRoute>}>
            <Route path="/coach"           element={<CoachDashboard />} />
            <Route path="/coach/players"   element={<div style={{padding:32}}>My Players</div>} />
            <Route path="/coach/sessions"  element={<div style={{padding:32}}>Sessions</div>} />
            <Route path="/coach/badges"    element={<div style={{padding:32}}>Award Badges</div>} />
          </Route>

          {/* Guardian */}
          <Route element={<ProtectedRoute roles={['guardian']}><AppLayout /></ProtectedRoute>}>
            <Route path="/guardian"        element={<GuardianDashboard />} />
            <Route path="/guardian/player" element={<div style={{padding:32}}>My Child</div>} />
            <Route path="/guardian/events" element={<div style={{padding:32}}>Events</div>} />
          </Route>

          {/* Player */}
          <Route element={<ProtectedRoute roles={['player']}><AppLayout /></ProtectedRoute>}>
            <Route path="/player"          element={<PlayerDashboard />} />
            <Route path="/player/badges"   element={<div style={{padding:32}}>My Badges</div>} />
            <Route path="/player/events"   element={<div style={{padding:32}}>Events</div>} />
          </Route>

          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
