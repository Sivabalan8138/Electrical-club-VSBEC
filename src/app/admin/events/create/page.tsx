'use client'

import { useState } from 'react'
import { createEvent } from '@/app/actions/events'

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    await createEvent(formData)
    // The action handles redirect
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Add New Event</h1>
      
      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Event Name *</label>
            <input type="text" name="event_name" className="form-input" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Date *</label>
              <input type="date" name="date" className="form-input" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Venue *</label>
              <input type="text" name="venue" className="form-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Start Time *</label>
              <input type="time" name="start_time" className="form-input" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">End Time *</label>
              <input type="time" name="end_time" className="form-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Team Size * (1 for Individual)</label>
              <input type="number" name="team_size" className="form-input" min="1" defaultValue="1" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Maximum Participants (0 for unlimited)</label>
              <input type="number" name="max_participants" className="form-input" min="0" defaultValue="0" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Registration Start Date *</label>
              <input type="datetime-local" name="registration_start" className="form-input" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Registration Deadline *</label>
              <input type="datetime-local" name="registration_deadline" className="form-input" required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description *</label>
            <textarea name="description" className="form-input" rows={4} required></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Rules *</label>
            <textarea name="rules" className="form-input" rows={4} required></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Initial Status</label>
              <select name="status" className="form-input" required>
                <option value="OPEN">OPEN</option>
                <option value="UPCOMING">UPCOMING</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Event Poster</label>
              <input type="file" name="poster" accept="image/*" className="form-input" style={{ padding: '0.5rem' }} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem 2rem' }}>
              {loading ? 'Publishing...' : 'Publish Event'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}
