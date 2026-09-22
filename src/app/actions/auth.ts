'use server'

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export async function login(formData: FormData) {
  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  const admin = await prisma.admin.findUnique({
    where: { username }
  })

  if (!admin) {
    return { error: 'Invalid credentials' }
  }

  const isValid = await bcrypt.compare(password, admin.password_hash)

  if (!isValid) {
    return { error: 'Invalid credentials' }
  }

  const session = await getSession()
  session.isLoggedIn = true
  session.username = admin.username
  await session.save()

  redirect('/admin')
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect('/admin/login')
}
