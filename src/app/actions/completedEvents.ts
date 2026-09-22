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
    return null
  }
}

export async function createCompletedEvent(formData: FormData) {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error("Unauthorized")

  const eventName = formData.get('event_name') as string
  const eventDate = formData.get('event_date') as string
  const venue = formData.get('venue') as string
  const description = formData.get('description') as string
  const highlights = formData.get('highlights') as string

  const posterFile = formData.get('poster') as File | null
  let posterUrl = null
  if (posterFile && posterFile.size > 0) {
    posterUrl = await saveFile(posterFile)
  }

  const completedEvent = await prisma.completedEvent.create({
    data: {
      event_name: eventName,
      event_date: eventDate,
      venue,
      description,
      highlights,
      poster: posterUrl
    }
  })

  // Handle multiple photos
  const photos = formData.getAll('photos') as File[]
  for (const photo of photos) {
    if (photo.size > 0) {
      const photoUrl = await saveFile(photo)
      if (photoUrl) {
        await prisma.eventPhoto.create({
          data: {
            completed_event_id: completedEvent.id,
            image_url: photoUrl
          }
        })
      }
    }
  }

  revalidatePath('/admin/completed-events')
  revalidatePath('/gallery')
  revalidatePath('/')
  redirect('/admin/completed-events')
}

export async function deleteCompletedEvent(id: string) {
  const session = await getSession()
  if (!session.isLoggedIn) throw new Error("Unauthorized")

  await prisma.completedEvent.delete({ where: { id } })
  revalidatePath('/admin/completed-events')
  revalidatePath('/gallery')
  revalidatePath('/')
}
