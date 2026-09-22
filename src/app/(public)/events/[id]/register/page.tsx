import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import RegistrationForm from "@/components/RegistrationForm"

const prisma = new PrismaClient()

export default async function RegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      event_name: true,
      team_size: true,
      status: true,
      max_participants: true
    }
  })

  if (!event) {
    notFound()
  }

  // Double check on server
  if (event.status !== 'OPEN') {
    return (
      <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--error)' }}>Registration Closed</h1>
        <p>Registration for this event is not open.</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
      <RegistrationForm event={event} />
    </div>
  )
}
