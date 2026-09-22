'use client'

import { useState } from 'react'
import { submitRegistration } from '@/app/actions/register'
import styles from './RegistrationForm.module.css'

interface EventProps {
  id: string
  event_name: string
  team_size: number
}

export default function RegistrationForm({ event }: { event: EventProps }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await submitRegistration(event.id, event.team_size, formData)
      
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={`glass-card ${styles.successCard}`}>
        <div className={styles.successIcon}>✓</div>
        <h2>Registration Successful!</h2>
        <p>You have successfully registered for <strong>{event.event_name}</strong>.</p>
        <div style={{ marginTop: '2rem' }}>
          <a href={`/events/${event.id}`} className="btn btn-secondary">Back to Event Details</a>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-card ${styles.formCard}`}>
      <h2>Register for {event.event_name}</h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {event.team_size > 1 && (
          <div className={styles.participantSection}>
            <h3>Team Information</h3>
            <div className="form-group">
              <label className="form-label">Team Name *</label>
              <input type="text" name="teamName" className="form-input" required />
            </div>
          </div>
        )}

        {Array.from({ length: event.team_size }).map((_, idx) => (
          <div key={idx} className={styles.participantSection}>
            <h3>{event.team_size === 1 ? 'Participant Details' : `Participant ${idx + 1} ${idx === 0 ? '(Team Leader)' : ''}`}</h3>
            
            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input type="text" name={`p${idx + 1}_name`} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Register Number *</label>
                <input type="text" name={`p${idx + 1}_registerNumber`} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Department *</label>
                <input type="text" name={`p${idx + 1}_department`} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Year *</label>
                <select name={`p${idx + 1}_year`} className="form-input" required>
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Section</label>
                <input type="text" name={`p${idx + 1}_section`} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input type="tel" name={`p${idx + 1}_mobileNumber`} className="form-input" required pattern="[0-9]{10}" title="10 digit mobile number" />
              </div>
              <div className="form-group">
                <label className="form-label">Email ID (Optional)</label>
                <input type="email" name={`p${idx + 1}_email`} className="form-input" />
              </div>
            </div>
          </div>
        ))}

        <div className={styles.formActions}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  )
}
