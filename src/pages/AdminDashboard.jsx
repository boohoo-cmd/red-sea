import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CalendarDays, Award, TrendingUp, Plus, Bell, Search } from 'lucide-react'
import { StatCard, Card, Avatar, AgeGroupPill, AttendanceDot, SectionHeader, Button, EventTypePill } from '@/components/ui'
import { PLAYERS, EVENTS, ANNOUNCEMENTS, STATS } from '@/lib/mockData'
import { useAuth } from '@/context/AuthContext'

function PageHeader({ title, sub }) {
  const { user } = useAuth()
  return (
    <div style={{
      padding:'24px 32px 20px',
      borderBottom:'1px solid var(--border)',
      background:'var(--bg-surface)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:10,
    }}>
      <div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'24px', fontWeight:700, letterSpacing:'0.03em', color:'var(--text-primary)' }}>
          {title}
        </h1>
        {sub && <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:2 }}>{sub}</p>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <button style={{
          width:38, height:38, borderRadius:'var(--radius-sm)',
          border:'1px solid var(--border)', background:'var(--bg-raised)',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', color:'var(--text-secondary)', position:'relative',
        }}>
          <Bell size={16} />
          <span style={{
            position:'absolute', top:8, right:8, width:7, height:7,
            borderRadius:'50%', background:'var(--red)',
            border:'2px solid var(--bg-surface)',
          }} />
        </button>
        <Avatar name={user?.name || ''} size={36} />
      </div>
    </div>
  )
}

function PlayerRow({ player }) {
  const fullName = `${player.firstName} ${player.lastName}`
  return (
    <tr style={{ borderBottom:'1px solid var(--border)', transition:'background 0.1s' }}
      onMouseEnter={e=>e.currentTarget.style.background='var(--bg-hover)'}
      onMouseLeave={e=>e.currentTarget.style.background=''}
    >
      <td style={{ padding:'12px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Avatar name={fullName} size={32} />
          <div>
            <div style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)' }}>{fullName}</div>
            <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{player.position}</div>
          </div>
        </div>
      </td>
      <td style={{ padding:'12px 16px' }}><AgeGroupPill group={player.ageGroup} /></td>
      <td style={{ padding:'12px 16px', fontSize:'13px', color:'var(--text-secondary)' }}>{player.team}</td>
      <td style={{ padding:'12px 16px' }}><AttendanceDot rate={player.attendance} /></td>
      <td style={{ padding:'12px 16px' }}>
        <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:'13px', fontWeight:600, color:'var(--blue-500)' }}>
          <Award size={13} />
          {player.badges}
        </span>
      </td>
      <td style={{ padding:'12px 16px' }}>
        <button style={{
          fontSize:'12px', fontWeight:600, color:'var(--blue-400)',
          background:'var(--blue-50)', border:'1px solid var(--blue-100)',
          padding:'4px 10px', borderRadius:'var(--radius-sm)', cursor:'pointer',
        }}>
          View
        </button>
      </td>
    </tr>
  )
}

function EventCard({ event }) {
  const d = new Date(event.date)
  const day  = d.toLocaleDateString('en-UG', { day:'2-digit' })
  const mon  = d.toLocaleDateString('en-UG', { month:'short' }).toUpperCase()

  return (
    <div style={{
      display:'flex', gap:14, padding:'14px 0',
      borderBottom:'1px solid var(--border)',
    }}>
      {/* Date block */}
      <div style={{
        width:48, flexShrink:0, textAlign:'center',
        background:'var(--blue-50)', borderRadius:'var(--radius-sm)',
        border:'1px solid var(--blue-100)',
        padding:'8px 4px',
      }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:700, color:'var(--blue-500)', lineHeight:1 }}>{day}</div>
        <div style={{ fontSize:'10px', fontWeight:700, color:'var(--blue-400)', letterSpacing:'0.08em' }}>{mon}</div>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
          <span style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)' }}>{event.title}</span>
          <EventTypePill type={event.type} />
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>
          {event.time} · {event.venue} · <AgeGroupPill group={event.ageGroup} />
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-secondary)', marginTop:4 }}>
          {event.rsvps} RSVPs confirmed
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [search, setSearch] = useState('')
  const filtered = PLAYERS.filter(p =>
    `${p.firstName} ${p.lastName} ${p.team} ${p.ageGroup}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-page)' }}>
      <PageHeader
        title="Dashboard"
        sub={`Red Sea Sport Academy — ${new Date().toLocaleDateString('en-UG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}`}
      />

      <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:28 }}>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
          <StatCard label="Total Players"     value={STATS.totalPlayers}       sub={`${STATS.activePlayers} active`}            icon={Users}       accent="var(--blue-400)" />
          <StatCard label="Sessions / Month"  value={STATS.sessionsThisMonth}  sub={`${STATS.avgAttendance}% avg attendance`}   icon={TrendingUp}  accent="var(--green)" />
          <StatCard label="Badges Awarded"    value={STATS.badgesThisMonth}    sub="This month"                                  icon={Award}       accent="var(--amber)" />
          <StatCard label="Upcoming Events"   value={STATS.upcomingEvents}     sub="Next 30 days"                               icon={CalendarDays} accent="var(--blue-300)" />
        </div>

        {/* Main content — players + sidebar */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:20, alignItems:'start' }}>

          {/* Players table */}
          <Card>
            <div style={{ padding:'20px 20px 0' }}>
              <SectionHeader
                title="Players"
                action={
                  <div style={{ display:'flex', gap:8 }}>
                    <div style={{
                      display:'flex', alignItems:'center', gap:8,
                      padding:'7px 12px', borderRadius:'var(--radius-sm)',
                      border:'1px solid var(--border)', background:'var(--bg-raised)',
                    }}>
                      <Search size={14} color="var(--text-muted)" />
                      <input
                        placeholder="Search players…"
                        value={search}
                        onChange={e=>setSearch(e.target.value)}
                        style={{
                          border:'none', outline:'none', background:'transparent',
                          fontSize:'13px', color:'var(--text-primary)', width:150,
                          fontFamily:'var(--font-body)',
                        }}
                      />
                    </div>
                    <Button variant="primary" size="sm">
                      <Plus size={14} /> Add player
                    </Button>
                  </div>
                }
              />
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ borderBottom:'2px solid var(--border)' }}>
                    {['Player','Age group','Team','Attendance','Badges',''].map(h => (
                      <th key={h} style={{
                        padding:'10px 16px', textAlign:'left',
                        fontSize:'11px', fontWeight:700, color:'var(--text-muted)',
                        letterSpacing:'0.07em', textTransform:'uppercase',
                        background:'var(--bg-raised)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0,10).map(p => <PlayerRow key={p.id} player={p} />)}
                </tbody>
              </table>
            </div>
            {filtered.length > 10 && (
              <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)', textAlign:'center' }}>
                <button style={{ fontSize:'13px', fontWeight:600, color:'var(--blue-400)', background:'none', border:'none', cursor:'pointer' }}>
                  View all {filtered.length} players →
                </button>
              </div>
            )}
          </Card>

          {/* Right column */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Upcoming events */}
            <Card style={{ padding:'20px' }}>
              <SectionHeader
                title="Upcoming Events"
                action={<Button variant="ghost" size="sm"><Plus size={13}/> New</Button>}
              />
              {EVENTS.map(e => <EventCard key={e.id} event={e} />)}
            </Card>

            {/* Announcements */}
            <Card style={{ padding:'20px' }}>
              <SectionHeader
                title="Announcements"
                action={<Button variant="ghost" size="sm"><Plus size={13}/> Post</Button>}
              />
              {ANNOUNCEMENTS.map(a => (
                <div key={a.id} style={{
                  padding:'12px 0', borderBottom:'1px solid var(--border)',
                }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:4 }}>
                    {a.pinned && (
                      <span style={{
                        fontSize:'10px', fontWeight:700, color:'var(--blue-400)',
                        background:'var(--blue-50)', padding:'2px 6px',
                        borderRadius:3, letterSpacing:'0.05em', flexShrink:0, marginTop:1,
                      }}>PIN</span>
                    )}
                    <span style={{ fontSize:'13px', fontWeight:600, color:'var(--text-primary)' }}>{a.title}</span>
                  </div>
                  <p style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:1.5 }}>{a.body}</p>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:6 }}>{a.date}</div>
                </div>
              ))}
            </Card>

            {/* Age group breakdown */}
            <Card style={{ padding:'20px' }}>
              <SectionHeader title="By Age Group" />
              {['U6','U8','U10','U12','U14','U16','U18'].map(g => {
                const count = PLAYERS.filter(p=>p.ageGroup===g).length
                const pct   = Math.round((count / PLAYERS.length) * 100)
                return (
                  <div key={g} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:'12px', fontWeight:600, color:'var(--text-secondary)' }}>{g}</span>
                      <span style={{ fontSize:'12px', color:'var(--text-muted)' }}>{count} players</span>
                    </div>
                    <div style={{ height:6, background:'var(--bg-hover)', borderRadius:99, overflow:'hidden' }}>
                      <div style={{
                        height:'100%', width:`${pct}%`,
                        background:'var(--blue-400)', borderRadius:99,
                        transition:'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
