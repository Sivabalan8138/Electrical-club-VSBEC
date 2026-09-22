import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import styles from "../page.module.css";

const prisma = new PrismaClient();

export default async function GalleryPage() {
  const completedEvents = await prisma.completedEvent.findMany({
    orderBy: { event_date: 'desc' },
    include: { photos: true }
  });

  return (
    <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
      <h1 className={styles.sectionTitle}>Completed Events</h1>
      
      <div className={styles.grid}>
        {completedEvents.length > 0 ? (
          completedEvents.map((event) => (
            <div key={event.id} className={`glass-card ${styles.card}`}>
              {event.poster && (
                <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.poster} alt={event.event_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div className={styles.cardHeader} style={event.poster ? { borderTop: 'none' } : {}}>
                <h3>{event.event_name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p className={styles.cardDesc}>{event.description.substring(0, 100)}...</p>
              </div>
              <div className={styles.cardFooter}>
                <Link href={`/gallery/${event.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                  View Photos ({event.photos.length})
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No completed events found.</p>
        )}
      </div>
    </div>
  );
}
