import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import GalleryLightbox from "@/components/GalleryLightbox"
import styles from "../../events/[id]/eventDetails.module.css"

const prisma = new PrismaClient()

export default async function GalleryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.completedEvent.findUnique({
    where: { id },
    include: {
      photos: true
    }
  })

  if (!event) {
    notFound()
  }

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
            <span className="badge badge-completed">COMPLETED</span>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Date</strong>
              <p>{event.event_date}</p>
            </div>
            <div className={styles.infoItem}>
              <strong>Venue</strong>
              <p>{event.venue}</p>
            </div>
          </div>
          
          <div className={styles.section}>
            <h2>Description</h2>
            <p className={styles.text}>{event.description}</p>
          </div>
          
          {event.highlights && (
            <div className={styles.section}>
              <h2>Highlights</h2>
              <p className={styles.text}>{event.highlights}</p>
            </div>
          )}
          
          <div className={styles.section} style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
            <h2>Event Gallery</h2>
            <GalleryLightbox photos={event.photos} />
          </div>
        </div>
      </div>
    </div>
  )
}
