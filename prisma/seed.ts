import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Admin
  const adminPasswordHash = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password_hash: adminPasswordHash,
    },
  })
  
  console.log({ admin })

  // Check if events already exist
  const existingEventsCount = await prisma.event.count()
  
  if (existingEventsCount === 0) {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const eventsData = [
      {
        event_name: 'TECHNOVA',
        description: 'A grand technical symposium featuring paper presentations and project showcases.',
        date: '2023-11-15',
        start_time: '09:00',
        end_time: '16:00',
        venue: 'Main Auditorium',
        team_size: 2,
        max_participants: 50,
        registration_start: new Date(),
        registration_deadline: nextWeek,
        rules: '1. Strict college ID required.\n2. Formal dress code.',
        status: 'OPEN',
      },
      {
        event_name: 'Random Circuit Building Challenge',
        description: 'Test your practical electronics knowledge by building random circuits on the spot.',
        date: '2023-11-16',
        start_time: '10:00',
        end_time: '13:00',
        venue: 'EEE Lab',
        team_size: 1,
        max_participants: 30,
        registration_start: new Date(),
        registration_deadline: nextWeek,
        rules: '1. Components will be provided.\n2. 2 hours time limit.',
        status: 'OPEN',
      },
      {
        event_name: 'ELECTROBID – The EEE Auction Challenge',
        description: 'An exciting auction where you bid for electrical components to complete your project.',
        date: '2023-11-17',
        start_time: '14:00',
        end_time: '17:00',
        venue: 'Seminar Hall',
        team_size: 3,
        max_participants: 15, // 15 teams
        registration_start: new Date(),
        registration_deadline: nextWeek,
        rules: '1. Initial virtual budget will be provided.\n2. Use logic and electronics knowledge to bid wisely.',
        status: 'OPEN',
      },
      {
        event_name: 'IDEAFEST',
        description: 'Present your innovative ideas to solve real-world electrical problems.',
        date: '2023-11-18',
        start_time: '09:00',
        end_time: '12:00',
        venue: 'Mini Auditorium',
        team_size: 4,
        max_participants: 20, // 20 teams
        registration_start: new Date(),
        registration_deadline: nextMonth,
        rules: '1. Submit abstract before event.\n2. 10 minutes presentation time.',
        status: 'UPCOMING',
      },
    ]

    for (const data of eventsData) {
      await prisma.event.create({ data })
    }
    
    console.log('Sample events seeded.')
  } else {
    console.log('Events already seeded.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
