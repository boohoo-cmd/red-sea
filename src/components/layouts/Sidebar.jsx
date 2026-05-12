import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Avatar, RoleBadge } from '@/components/ui'
import {
  LayoutDashboard, Users, CalendarDays, Megaphone,
  Award, LogOut, User, ClipboardList, ShieldCheck
} from 'lucide-react'

const NAV = {
  super_admin: [
    { to:'/admin',         icon:LayoutDashboard, label:'Dashboard'    },
    { to:'/admin/players', icon:Users,           label:'Players'      },
    { to:'/admin/events',  icon:CalendarDays,    label:'Events'       },
    { to:'/admin/comms',   icon:Megaphone,       label:'Communications'},
    { to:'/admin/badges',  icon:Award,           label:'Badges'       },
  ],
  coach: [
    { to:'/coach',           icon:LayoutDashboard, label:'Dashboard'   },
    { to:'/coach/players',   icon:Users,           label:'My Players'  },
    { to:'/coach/sessions',  icon:ClipboardList,   label:'Sessions'    },
    { to:'/coach/badges',    icon:Award,           label:'Award Badges'},
  ],
  guardian: [
    { to:'/guardian',        icon:LayoutDashboard, label:'Dashboard' },
    { to:'/guardian/player', icon:User,            label:'My Child'  },
    { to:'/guardian/events', icon:CalendarDays,    label:'Events'    },
  ],
  player: [
    { to:'/player',        icon:User,          label:'My Profile' },
    { to:'/player/badges', icon:Award,         label:'My Badges'  },
    { to:'/player/events', icon:CalendarDays,  label:'Events'     },
  ],
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = NAV[user?.role] || []

  return (
    <aside style={{
      width:'var(--sidebar-w)', minHeight:'100vh', flexShrink:0,
      background:'var(--blue-900)',
      display:'flex', flexDirection:'column',
      borderRight:'1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo block */}
      <div style={{
        padding:'24px 20px 22px',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Crest */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
          <div style={{
            width:42, height:42, borderRadius:10,
            background:'linear-gradient(135deg, var(--blue-400) 0%, var(--blue-300) 100%)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 12px rgba(37,99,200,0.5)',
            flexShrink:0,
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {/* Simplified football/shield icon */}
              <path d="M11 2L4 6v5c0 4 3.5 7.5 7 8.5 3.5-1 7-4.5 7-8.5V6L11 2z" fill="white" opacity="0.9"/>
              <circle cx="11" cy="11" r="4" fill="none" stroke="rgba(30,77,155,0.6)" strokeWidth="1.5"/>
              <path d="M8 11h6M11 8v6" stroke="rgba(30,77,155,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:700,
              color:'#fff', letterSpacing:'0.06em', lineHeight:1.1,
            }}>RED SEA</div>
            <div style={{
              fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:500,
              color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em',
            }}>SPORT ACADEMY INT.</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:'14px 10px', overflowY:'auto' }}>
        <div style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.25)', letterSpacing:'0.12em', padding:'0 10px 8px', textTransform:'uppercase' }}>
          Menu
        </div>
        {links.map(({ to, label, icon:Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to.split('/').length <= 2}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:10,
              padding:'9px 12px', borderRadius:'var(--radius-sm)',
              marginBottom:2, fontSize:'14px', fontWeight:500,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
              background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--blue-300)' : '3px solid transparent',
              transition:'all 0.15s', textDecoration:'none',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding:'14px 12px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <Avatar name={user?.name || ''} size={36} />
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:'rgba(255,255,255,0.9)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {user?.name}
            </div>
            <RoleBadge role={user?.role} />
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          style={{
            display:'flex', alignItems:'center', gap:8, width:'100%',
            padding:'8px 10px', borderRadius:'var(--radius-sm)',
            color:'rgba(255,255,255,0.4)', fontSize:'13px',
            background:'none', border:'none', cursor:'pointer',
            transition:'all 0.15s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.color='#f87171'; e.currentTarget.style.background='rgba(248,113,113,0.1)' }}
          onMouseLeave={e=>{ e.currentTarget.style.color=''; e.currentTarget.style.background='' }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
