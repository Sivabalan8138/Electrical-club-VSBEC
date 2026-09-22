'use server'

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function saveFile(file: File): Promise<string | null> {
  if (file.size === 0) return null
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  
  try {
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(path.join(uploadDir, filename), buffer)
    return `/uploads/${filename}`
  } catch (err) {
    console.error("Error saving file:", err)
    return null
  }
}

export async function createEvent(formData: FormData) {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error("Unauthorized")

  const eventName = formData.get('event_name') as string
  const date = formData.get('date') as string
  const startTime = formData.get('start_time') as string
  const endTime = formData.get('end_time') as string
  const venue = formData.get('venue') as string
  const description = formData.get('description') as string
  const rules = formData.get('rules') as string
  const teamSize = parseInt(formData.get('team_size') as string)
  const maxParticipants = parseInt(formData.get('max_participants') as string)
  const registrationStart = new Date(formData.get('registration_start') as string)
  const registrationDeadline = new Date(formData.get('registration_deadline') as string)
  const status = formData.get('status') as string

  const posterFile = formData.get('poster') as File | null
  let posterUrl = null
  if (posterFile && posterFile.size > 0) {
    posterUrl = await saveFile(posterFile)
  }

  await prisma.event.create({
    data: {
      event_name: eventName,
      date,
      start_time: startTime,
      end_time: endTime,
      venue,
      description,
      rules,
      team_size: teamSize,
      max_participants: maxParticipants,
      registration_start: registrationStart,
      registration_deadline: registrationDeadline,
      status,
      poster: posterUrl
    }
  })

  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/')
  redirect('/admin/events')
}

export async function deleteEvent(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error("Unauthorized")

  await prisma.event.delete({ where: { id } })
  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/')
}

export async function updateEventStatus(id: string, status: string) {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error("Unauthorized")

  await prisma.event.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/events')
  revalidatePath(`/events/${id}`)
  revalidatePath('/events')
}
