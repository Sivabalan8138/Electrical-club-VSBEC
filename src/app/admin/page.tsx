import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    redirect('/admin/login')
  }

  // Get Statistics
  const totalEvents = await prisma.event.count()
  const upcomingEventsCount = await prisma.event.count({
    where: { status: { in: ['OPEN', 'UPCOMING', 'FULL'] } }
  })
  const completedEventsCount = await prisma.completedEvent.count()
  
  const totalRegistrations = await prisma.participant.count()
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todaysRegistrations = await prisma.participant.count({
    where: {
      registration: {
        registered_at: {
          gte: today
        }
      }
    }
  })

  // Recent Registrations
  const recentRegistrations = await prisma.participant.findMany({
    take: 5,
    orderBy: {
      registration: {
        registered_at: 'desc'
      }
    },
    include: {
      registration: {
        include: {
          event: true
        }
      }
    }
  })

  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Events</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>{totalEvents}</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Upcoming Events</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>{upcomingEventsCount}</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Completed Events</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>{completedEventsCount}</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Registrations</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>{totalRegistrations}</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Today's Registrations</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: 'var(--success)' }}>{todaysRegistrations}</p>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '1.5rem' }}>Recent Registrations</h2>
      
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>Participant</th>
              <th style={{ padding: '1rem' }}>Event</th>
              <th style={{ padding: '1rem' }}>Department</th>
              <th style={{ padding: '1rem' }}>Year</th>
              <th style={{ padding: '1rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentRegistrations.length > 0 ? (
              recentRegistrations.map((participant) => (
                <tr key={participant.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>
                    {participant.name}
                    <br/>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{participant.register_number}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>{participant.registration.event.event_name}</td>
                  <td style={{ padding: '1rem' }}>{participant.department}</td>
                  <td style={{ padding: '1rem' }}>{participant.year}</td>
                  <td style={{ padding: '1rem' }}>{new Date(participant.registration.registered_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
