import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import EventCard from "@/components/EventCard";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function Home() {
  const upcomingEvents = await prisma.event.findMany({
    where: { status: { in: ['OPEN', 'UPCOMING', 'FULL'] } },
    take: 3,
    orderBy: { date: 'asc' }
  });

  const completedEvents = await prisma.completedEvent.findMany({
    take: 3,
    orderBy: { event_date: 'desc' },
    include: { photos: true }
  });

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`animate-fade-in ${styles.title}`}>ELECTRICAL CLUB</h1>
          <h2 className={`animate-fade-in ${styles.subtitle}`}>
            Department of Electrical and Electronics Engineering
          </h2>
          <h3 className={`animate-fade-in ${styles.college}`}>
            V.S.B. Engineering College, Karur
          </h3>
          <p className={`animate-fade-in ${styles.motto}`}>
            Learn &bull; Compete &bull; Innovate &bull; Build
          </p>
          <div className={`animate-fade-in ${styles.heroButtons}`}>
            <Link href="/events" className="btn btn-primary">View Events</Link>
            <Link href="/events" className="btn btn-secondary">Register for Events</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <div className={styles.grid}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event as any} />
              ))
            ) : (
              <p>No upcoming events at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Completed Events</h2>
          <div className={styles.grid}>
            {completedEvents.length > 0 ? (
              completedEvents.map((event) => (
                <EventCard key={event.id} event={event as any} isCompleted />
              ))
            ) : (
              <p>No completed events to show.</p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>About Electrical Club</h2>
          <div className={`glass-card ${styles.aboutCard}`}>
            <p>
              The Electrical Club of the Department of Electrical and Electronics Engineering, V.S.B. Engineering College, Karur is a student-focused platform that encourages technical knowledge, creativity, teamwork, and practical skills.
            </p>
            <p>
              The club conducts technical events, workshops, quizzes, circuit-building challenges, project exhibitions, competitions, and awareness activities to provide students with opportunities to apply classroom knowledge in real-world situations.
            </p>
            
            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Our Objectives</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <li>Develop technical and practical skills in electrical engineering.</li>
              <li>Encourage innovation, creativity, and problem-solving.</li>
              <li>Provide hands-on exposure through projects and technical activities.</li>
              <li>Improve teamwork, communication, and leadership skills.</li>
              <li>Create an active environment for students to learn, compete, and innovate.</li>
            </ul>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Our Vision</h3>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
              &ldquo;To inspire students to explore, innovate, and build the future of electrical engineering.&rdquo;
            </p>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Our Mission</h3>
            <p style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--secondary)' }}>
              &ldquo;Learn &rarr; Explore &rarr; Create &rarr; Innovate&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
