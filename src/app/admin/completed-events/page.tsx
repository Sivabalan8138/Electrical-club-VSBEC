import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import Link from "next/link"
import CompletedEventsTable from "@/components/CompletedEventsTable"

const prisma = new PrismaClient()

export default async function AdminCompletedEventsPage() {
  const session = await getSession()
  if (!session.isLoggedIn) redirect('/admin/login')

  const events = await prisma.completedEvent.findMany({
    orderBy: { event_date: 'desc' },
    include: {
      _count: { select: { photos: true } }
    }
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Manage Completed Events</h1>
        <Link href="/admin/completed-events/create" className="btn btn-primary">
          + Add Completed Event
        </Link>
      </div>
      
      <div className="glass-card" style={{ padding: '0' }}>
        <CompletedEventsTable events={events} />
      </div>
    </div>
  )
}
