'use client'

import { useState } from 'react'
import { deleteCompletedEvent } from '@/app/actions/completedEvents'

export default function CompletedEventsTable({ events }: { events: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this completed event? All photos will also be deleted.")) {
      setLoading(id)
      await deleteCompletedEvent(id)
      setLoading(null)
    }
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <th style={{ padding: '1rem' }}>Event</th>
          <th style={{ padding: '1rem' }}>Date</th>
          <th style={{ padding: '1rem' }}>Photos</th>
          <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', fontWeight: '500' }}>
                {event.event_name}
                <br/>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{event.venue}</span>
              </td>
              <td style={{ padding: '1rem' }}>{event.event_date}</td>
              <td style={{ padding: '1rem' }}>{event._count.photos} Photos</td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <button 
                  onClick={() => handleDelete(event.id)} 
                  className="btn" 
                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)', padding: '0.5rem 1rem' }}
                  disabled={loading === event.id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No completed events found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
