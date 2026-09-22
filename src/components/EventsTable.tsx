'use client'

import { useState } from 'react'
import { deleteEvent, updateEventStatus } from '@/app/actions/events'

export default function EventsTable({ events }: { events: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event? All registrations will also be deleted.")) {
      setLoading(id)
      await deleteEvent(id)
      setLoading(null)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(`status-${id}`)
    await updateEventStatus(id, newStatus)
    setLoading(null)
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <th style={{ padding: '1rem' }}>Event</th>
          <th style={{ padding: '1rem' }}>Date & Time</th>
          <th style={{ padding: '1rem' }}>Registrations</th>
          <th style={{ padding: '1rem' }}>Status</th>
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
              <td style={{ padding: '1rem' }}>
                {event.date}
                <br/>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{event.start_time} - {event.end_time}</span>
              </td>
              <td style={{ padding: '1rem' }}>
                {event._count.registrations} / {event.max_participants > 0 ? event.max_participants : '∞'}
              </td>
              <td style={{ padding: '1rem' }}>
                <select 
                  value={event.status} 
                  onChange={(e) => handleStatusChange(event.id, e.target.value)}
                  disabled={loading === `status-${event.id}`}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    border: '1px solid var(--glass-border)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="FULL">FULL</option>
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </td>
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
            <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No events found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
