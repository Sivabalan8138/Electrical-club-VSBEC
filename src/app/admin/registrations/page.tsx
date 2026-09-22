import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import RegistrationsTable from "@/components/RegistrationsTable"

const prisma = new PrismaClient()

export default async function RegistrationsPage() {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    redirect('/admin/login')
  }

  const participants = await prisma.participant.findMany({
    include: {
      registration: {
        include: {
          event: {
            select: { id: true, event_name: true }
          }
        }
      }
    },
    orderBy: {
      registration: {
        registered_at: 'desc'
      }
    }
  })

  const events = await prisma.event.findMany({
    select: { id: true, event_name: true },
    orderBy: { date: 'desc' }
  })

  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Registration Management</h1>
      <RegistrationsTable data={participants} events={events.map(e => ({id: e.id, name: e.event_name}))} />
    </div>
  )
}
