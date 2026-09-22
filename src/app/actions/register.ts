'use server'

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function submitRegistration(eventId: string, teamSize: number, formData: FormData) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });

    if (!event) {
      return { success: false, error: "Event not found." }
    }

    if (event.status !== 'OPEN') {
      return { success: false, error: "Registration is not open for this event." }
    }

    if (event.max_participants > 0 && event._count.registrations >= event.max_participants) {
      return { success: false, error: "Event is already full." }
    }

    const teamName = formData.get('teamName')?.toString() || null;
    
    // Extract participants
    const participants = [];
    for (let i = 1; i <= teamSize; i++) {
      const name = formData.get(`p${i}_name`)?.toString();
      const registerNumber = formData.get(`p${i}_registerNumber`)?.toString();
      const department = formData.get(`p${i}_department`)?.toString();
      const year = formData.get(`p${i}_year`)?.toString();
      const section = formData.get(`p${i}_section`)?.toString();
      const mobileNumber = formData.get(`p${i}_mobileNumber`)?.toString();
      const email = formData.get(`p${i}_email`)?.toString();

      if (!name || !registerNumber || !department || !year || !mobileNumber) {
        return { success: false, error: `Missing required fields for Participant ${i}.` }
      }

      participants.push({
        name,
        register_number: registerNumber,
        department,
        year,
        section: section || null,
        mobile_number: mobileNumber,
        email: email || null
      });
    }

    // Check duplicate
    for (const p of participants) {
      const existing = await prisma.participant.findFirst({
        where: {
          register_number: p.register_number,
          registration: {
            event_id: eventId
          }
        }
      });
      if (existing) {
        return { success: false, error: `Participant with Register Number ${p.register_number} is already registered for this event.` }
      }
    }

    // Create registration
    await prisma.registration.create({
      data: {
        event_id: eventId,
        team_name: teamName,
        participants: {
          create: participants
        }
      }
    });

    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/admin`);
    return { success: true }

  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, error: "An unexpected error occurred during registration." }
  }
}
