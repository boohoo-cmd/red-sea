import { useAuth } from '@/context/AuthContext'
import { Avatar, RoleBadge } from '@/components/ui'

function PortalPlaceholder({ title, color, description }) {
  const { user } = useAuth()
  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'var(--bg-page)', flexDirection:'column', gap:20, padding:40,
    }}>
      <div style={{
        width:64, height:64, borderRadius:16,
        background:color, display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:28,
      }}>{title[0]}</div>
      <div style={{ textAlign:'center' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>
          {title} Portal
        </h1>
        <p style={{ color:'var(--text-muted)', maxWidth:360, lineHeight:1.7 }}>{description}</p>
      </div>
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        padding:'14px 20px', background:'var(--bg-surface)',
        border:'1px solid var(--border)', borderRadius:'var(--radius-md)',
      }}>
        <Avatar name={user?.name || ''} size={40} />
        <div>
          <div style={{ fontWeight:600, color:'var(--text-primary)' }}>{user?.name}</div>
          <RoleBadge role={user?.role} />
        </div>
      </div>
      <p style={{ fontSize:'12px', color:'var(--text-muted)' }}>
        This portal is being built. Come back soon.
      </p>
    </div>
  )
}

export function CoachDashboard() {
  return <PortalPlaceholder title="Coach" color="#dbeafe" description="Manage your team sessions, log player progress, and award badges to players." />
}

export function GuardianDashboard() {
  return <PortalPlaceholder title="Guardian" color="#fef3c7" description="Track your child's progress, view upcoming events, and stay connected with the academy." />
}

export function PlayerDashboard() {
  return <PortalPlaceholder title="Player" color="#dcfce7" description="View your profile, earned badges, and upcoming events at Red Sea Academy." />
}

export function Unauthorized() {
  return <PortalPlaceholder title="Unauthorized" color="#fee2e2" description="You don't have permission to view this page." />
}
