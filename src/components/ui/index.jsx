// ─── Button ──────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', style, ...props }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
    border: 'none', borderRadius: 'var(--radius-sm)',
    transition: 'all 0.15s', textDecoration: 'none',
  }
  const variants = {
    primary:   { background: 'var(--blue-400)', color: '#fff', boxShadow: '0 2px 8px rgba(37,99,200,0.35)' },
    secondary: { background: 'var(--bg-raised)', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)' },
    ghost:     { background: 'transparent', color: 'var(--text-secondary)' },
    danger:    { background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid rgba(220,38,38,0.2)' },
    white:     { background: '#fff', color: 'var(--blue-500)', boxShadow: 'var(--shadow-sm)' },
  }
  const sizes = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '9px 16px', fontSize: '14px' },
    lg: { padding: '11px 22px', fontSize: '15px' },
  }
  return (
    <button style={{ ...base, ...variants[variant], ...sizes[size], ...style }} {...props}>
      {children}
    </button>
  )
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
const AVATAR_BG = ['#1a3a6e','#1e4d9b','#122a52','#0d1f3c','#1a3a6e','#2563c8']
function colorFor(name='') {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_BG[Math.abs(h) % AVATAR_BG.length]
}
export function Avatar({ name = '', size = 36, src }) {
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  if (src) return <img src={src} alt={name} style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background: colorFor(name),
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: size*0.36, fontWeight:700, color:'rgba(255,255,255,0.9)',
      flexShrink:0, fontFamily:'var(--font-display)', letterSpacing:'0.04em',
      border: '2px solid rgba(255,255,255,0.15)',
    }}>
      {initials}
    </div>
  )
}

// ─── RoleBadge ───────────────────────────────────────────────────────────────
const ROLES = {
  super_admin: { bg:'#dbeafe', color:'#1e4d9b', label:'Admin'    },
  coach:       { bg:'#dcfce7', color:'#15803d', label:'Coach'    },
  guardian:    { bg:'#fef3c7', color:'#b45309', label:'Guardian' },
  player:      { bg:'#ede9fe', color:'#6d28d9', label:'Player'   },
}
export function RoleBadge({ role }) {
  const c = ROLES[role] || ROLES.player
  return (
    <span style={{
      background:c.bg, color:c.color,
      fontSize:'11px', fontWeight:700, letterSpacing:'0.06em',
      padding:'2px 8px', borderRadius:'4px', textTransform:'uppercase',
    }}>{c.label}</span>
  )
}

// ─── AgeGroupPill ─────────────────────────────────────────────────────────────
export function AgeGroupPill({ group }) {
  return (
    <span style={{
      background:'var(--blue-100)', color:'var(--blue-500)',
      fontSize:'12px', fontWeight:600, padding:'2px 9px',
      borderRadius:'99px', whiteSpace:'nowrap',
    }}>{group}</span>
  )
}

// ─── StatusDot ───────────────────────────────────────────────────────────────
export function AttendanceDot({ rate }) {
  const color = rate >= 90 ? 'var(--green)' : rate >= 75 ? 'var(--amber)' : 'var(--red)'
  return (
    <span style={{ display:'flex', alignItems:'center', gap:6 }}>
      <span style={{ width:7, height:7, borderRadius:'50%', background:color, flexShrink:0 }} />
      <span style={{ color, fontSize:'13px', fontWeight:600 }}>{rate}%</span>
    </span>
  )
}

// ─── StatCard ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, icon: Icon, accent = 'var(--blue-400)' }) {
  return (
    <div style={{
      background:'var(--bg-surface)', border:'1px solid var(--border)',
      borderRadius:'var(--radius-md)', padding:'20px',
      boxShadow:'var(--shadow-sm)',
      display:'flex', flexDirection:'column', gap:8,
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:'12px', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
          {label}
        </span>
        {Icon && (
          <span style={{
            width:34, height:34, borderRadius:'var(--radius-sm)',
            background:'var(--bg-raised)', border:'1px solid var(--border)',
            display:'flex', alignItems:'center', justifyContent:'center', color:accent,
          }}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <div style={{ fontSize:'32px', fontWeight:700, fontFamily:'var(--font-display)', color:'var(--text-primary)', lineHeight:1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <div style={{
      background:'var(--bg-surface)', border:'1px solid var(--border)',
      borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-sm)', ...style,
    }}>
      {children}
    </div>
  )
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:700, color:'var(--text-primary)', letterSpacing:'0.02em' }}>
        {title}
      </h2>
      {action}
    </div>
  )
}

// ─── EventTypePill ───────────────────────────────────────────────────────────
const EVENT_TYPES = {
  training: { bg:'#dbeafe', color:'#1e4d9b', label:'Training' },
  match:    { bg:'#fee2e2', color:'#b91c1c', label:'Match'    },
  event:    { bg:'#fef3c7', color:'#b45309', label:'Event'    },
}
export function EventTypePill({ type }) {
  const c = EVENT_TYPES[type] || EVENT_TYPES.event
  return (
    <span style={{
      background:c.bg, color:c.color,
      fontSize:'11px', fontWeight:700, letterSpacing:'0.05em',
      padding:'2px 8px', borderRadius:'4px', textTransform:'uppercase',
    }}>{c.label}</span>
  )
}
