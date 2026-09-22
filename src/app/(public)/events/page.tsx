import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import EventCard from "@/components/EventCard";
import styles from "../page.module.css";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function EventsPage() {
  const upcomingEvents = await prisma.event.findMany({
    orderBy: { date: 'asc' }
  });

  return (
    <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
      <h1 className={styles.sectionTitle}>Upcoming Events</h1>
      
      <div className={styles.grid}>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event as any} />
          ))
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>
    </div>
  );
}
