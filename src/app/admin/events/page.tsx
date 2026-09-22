import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import EventsTable from "@/components/EventsTable"

const prisma = new PrismaClient()

export default async function AdminEventsPage() {
  const session = await getSession()
  if (!session.isLoggedIn) redirect('/admin/login')

  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: {
      _count: { select: { registrations: true } }
    }
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Manage Upcoming Events</h1>
        <Link href="/admin/events/create" className="btn btn-primary">
          + Add New Event
        </Link>
      </div>
      
      <div className="glass-card" style={{ padding: '0' }}>
        <EventsTable events={events} />
      </div>
    </div>
  )
}
