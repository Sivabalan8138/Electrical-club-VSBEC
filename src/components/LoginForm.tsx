'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Admin Login</h2>
      
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-input" required autoComplete="off" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-input" required autoComplete="new-password" />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
