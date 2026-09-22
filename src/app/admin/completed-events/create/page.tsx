'use client'

import { useState } from 'react'
import { createCompletedEvent } from '@/app/actions/completedEvents'

export default function CreateCompletedEventPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    await createCompletedEvent(formData)
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Add Completed Event</h1>
      
      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Event Name *</label>
            <input type="text" name="event_name" className="form-input" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Event Date *</label>
              <input type="text" name="event_date" placeholder="e.g. 15th Nov 2023" className="form-input" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Venue *</label>
              <input type="text" name="venue" className="form-input" required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description *</label>
            <textarea name="description" className="form-input" rows={4} required></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Highlights</label>
            <textarea name="highlights" className="form-input" rows={4}></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Event Poster (Optional)</label>
              <input type="file" name="poster" accept="image/*" className="form-input" style={{ padding: '0.5rem' }} />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Event Photos (Multiple allowed)</label>
              <input type="file" name="photos" accept="image/*" multiple className="form-input" style={{ padding: '0.5rem' }} required />
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem 2rem' }}>
              {loading ? 'Publishing...' : 'Publish Completed Event'}
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
