import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const DEMOS = [
  { key:'admin',    label:'Admin',    role:'super_admin', email:'admin@redsea.ac.ug'    },
  { key:'coach',    label:'Coach',    role:'coach',       email:'coach@redsea.ac.ug'    },
  { key:'guardian', label:'Guardian', role:'guardian',    email:'guardian@redsea.ac.ug' },
  { key:'player',   label:'Player',   role:'player',      email:'player@redsea.ac.ug'   },
]

export default function Login() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused]   = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const { ok, redirect } = await login(email, password)
    if (ok) navigate(redirect || '/admin')
  }

  const fillDemo = (d) => { setEmail(d.email); setPassword('password') }

  const inputStyle = (field) => ({
    width:'100%', padding:'10px 14px', fontSize:'14px',
    background:'var(--off-white)', color:'var(--text-primary)',
    border:`1.5px solid ${focused===field ? 'var(--blue-400)' : 'var(--border-strong)'}`,
    borderRadius:'var(--radius-sm)', outline:'none',
    transition:'border-color 0.15s',
    fontFamily:'var(--font-body)',
  })

  return (
    <div style={{
      minHeight:'100vh', display:'flex',
      background:'var(--bg-page)',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
        background:'linear-gradient(160deg, var(--blue-900) 0%, var(--blue-700) 60%, var(--blue-500) 100%)',
        padding:48, position:'relative', overflow:'hidden',
        minHeight:'100vh',
      }}>
        {/* Background pattern */}
        <div style={{
          position:'absolute', inset:0, opacity:0.04,
          backgroundImage:`repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize:'30px 30px',
        }} />
        {/* Decorative circle */}
        <div style={{
          position:'absolute', bottom:-120, right:-120,
          width:400, height:400, borderRadius:'50%',
          border:'1px solid rgba(255,255,255,0.07)',
        }} />
        <div style={{
          position:'absolute', bottom:-60, right:-60,
          width:260, height:260, borderRadius:'50%',
          border:'1px solid rgba(255,255,255,0.06)',
        }} />

        <div style={{ position:'relative', textAlign:'center', maxWidth:340 }}>
          {/* Crest */}
          <div style={{
            width:72, height:72, borderRadius:18, margin:'0 auto 24px',
            background:'rgba(255,255,255,0.12)',
            border:'1px solid rgba(255,255,255,0.2)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(8px)',
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 3L5 9v9c0 6.5 5.5 12 13 14 7.5-2 13-7.5 13-14V9L18 3z" fill="white" opacity="0.9"/>
              <circle cx="18" cy="18" r="6" fill="none" stroke="rgba(30,77,155,0.5)" strokeWidth="2"/>
              <path d="M13 18h10M18 13v10" stroke="rgba(30,77,155,0.5)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily:'var(--font-display)', fontSize:'36px', fontWeight:700,
            color:'#fff', letterSpacing:'0.06em', lineHeight:1.1, marginBottom:8,
          }}>
            RED SEA SPORT<br />ACADEMY INT.
          </h1>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'14px', lineHeight:1.7 }}>
            Kasanga · Gaba Road · Kampala, Uganda<br />
            Developing champions since day one.
          </p>

          {/* Stats strip */}
          <div style={{
            display:'flex', gap:0, marginTop:40,
            background:'rgba(255,255,255,0.07)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:'var(--radius-md)', overflow:'hidden',
          }}>
            {[['500+','Players'],['12','Teams'],['18','Coaches']].map(([num,lbl], i) => (
              <div key={lbl} style={{
                flex:1, padding:'16px 0', textAlign:'center',
                borderRight: i<2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:700, color:'#fff' }}>{num}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.45)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width:420, display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'48px 40px', background:'var(--bg-surface)',
        boxShadow:'-8px 0 40px rgba(10,22,40,0.08)',
      }}>
        <div style={{ marginBottom:36 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:700, color:'var(--text-primary)', letterSpacing:'0.03em', marginBottom:6 }}>
            Sign in
          </h2>
          <p style={{ color:'var(--text-muted)', fontSize:'14px' }}>
            Access your academy portal
          </p>
        </div>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div>
            <label style={{ fontSize:'13px', fontWeight:600, color:'var(--text-secondary)', display:'block', marginBottom:6 }}>
              Email address
            </label>
            <input
              type="email" value={email} required
              placeholder="your@redsea.ac.ug"
              style={inputStyle('email')}
              onFocus={()=>setFocused('email')}
              onBlur={()=>setFocused(null)}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize:'13px', fontWeight:600, color:'var(--text-secondary)', display:'block', marginBottom:6 }}>
              Password
            </label>
            <input
              type="password" value={password} required
              placeholder="••••••••"
              style={inputStyle('password')}
              onFocus={()=>setFocused('password')}
              onBlur={()=>setFocused(null)}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div style={{
              background:'var(--red-bg)', color:'var(--red)', borderRadius:'var(--radius-sm)',
              padding:'10px 14px', fontSize:'13px', fontWeight:500,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              padding:'12px', background:'var(--blue-400)', color:'#fff',
              fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:700,
              letterSpacing:'0.08em', borderRadius:'var(--radius-sm)', border:'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow:'0 4px 14px rgba(37,99,200,0.4)',
              transition:'all 0.15s',
              marginTop:2,
            }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>
        </form>

        {/* Demo accounts */}
        <div style={{ marginTop:32 }}>
          <div style={{
            display:'flex', alignItems:'center', gap:10, marginBottom:14,
          }}>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
            <span style={{ fontSize:'12px', color:'var(--text-muted)', fontWeight:500 }}>Demo accounts</span>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {DEMOS.map(d => (
              <button
                key={d.key}
                onClick={() => fillDemo(d)}
                style={{
                  padding:'10px 12px', borderRadius:'var(--radius-sm)',
                  border:'1px solid var(--border)', background:'var(--bg-raised)',
                  cursor:'pointer', textAlign:'left', transition:'all 0.15s',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--blue-300)'; e.currentTarget.style.background='var(--blue-50)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-raised)' }}
              >
                <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text-primary)' }}>{d.label}</div>
                <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:2 }}>password: password</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
