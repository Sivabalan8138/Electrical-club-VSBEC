import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import styles from "./eventDetails.module.css";

const prisma = new PrismaClient();

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      _count: {
        select: { registrations: true }
      }
    }
  });

  if (!event) {
    notFound();
  }

  // Calculate if FULL
  const isFull = event.max_participants > 0 && event._count.registrations >= event.max_participants;
  const displayStatus = isFull && event.status === 'OPEN' ? 'FULL' : event.status;

  return (
    <div className={`container ${styles.detailsContainer}`}>
      <div className={`glass-card ${styles.detailsCard}`}>
        {event.poster && (
          <div className={styles.posterContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.poster} alt={event.event_name} className={styles.poster} />
          </div>
        )}
        
        <div className={styles.detailsContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>{event.event_name}</h1>
            <span className={`badge badge-${displayStatus.toLowerCase()}`}>{displayStatus}</span>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Date & Time</strong>
              <p>{event.date} | {event.start_time} - {event.end_time}</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Venue</strong>
              <p>{event.venue}</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Team Size</strong>
              <p>{event.team_size === 1 ? 'Individual Event' : `${event.team_size} Members per Team`}</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Registration Deadline</strong>
              <p>{new Date(event.registration_deadline).toLocaleDateString()}</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Registrations</strong>
              <p>{event._count.registrations} / {event.max_participants > 0 ? event.max_participants : 'Unlimited'}</p>
            </div>
          </div>
          
          <div className={styles.section}>
            <h2>Description</h2>
            <p className={styles.text}>{event.description}</p>
          </div>
          
          <div className={styles.section}>
            <h2>Rules</h2>
            <pre className={styles.rules}>{event.rules}</pre>
          </div>
          
          <div className={styles.actionContainer}>
            {displayStatus === 'OPEN' ? (
              <Link href={`/events/${event.id}/register`} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                REGISTER NOW
              </Link>
            ) : (
              <button className="btn btn-secondary" disabled style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                REGISTRATION {displayStatus}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
