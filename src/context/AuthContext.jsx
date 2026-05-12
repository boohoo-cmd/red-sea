import { createContext, useContext, useState } from 'react'

const MOCK_USERS = {
  admin:    { id:'u-001', name:'Sarah Okafor',  email:'admin@redsea.ac.ug',    role:'super_admin' },
  coach:    { id:'u-002', name:'James Mutebi',  email:'coach@redsea.ac.ug',    role:'coach',      teamId:'t-lions' },
  guardian: { id:'u-003', name:'Grace Nakato',  email:'guardian@redsea.ac.ug', role:'guardian',   playerIds:['p-001','p-003'] },
  player:   { id:'u-004', name:'Eli Nakato',    email:'player@redsea.ac.ug',   role:'player',     playerId:'p-001' },
}

const REDIRECTS = { super_admin:'/admin', coach:'/coach', guardian:'/guardian', player:'/player' }

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setLoading(true); setError(null)
    await new Promise(r => setTimeout(r, 700))
    const key = email.split('@')[0].toLowerCase()
    const found = MOCK_USERS[key]
    if (found && password === 'password') {
      setUser(found); setLoading(false)
      return { ok: true, redirect: REDIRECTS[found.role] }
    }
    setError('Invalid credentials'); setLoading(false)
    return { ok: false }
  }

  const logout = () => setUser(null)
  const can = (roles) => user && roles.includes(user.role)

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, can }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth outside AuthProvider')
  return ctx
}
