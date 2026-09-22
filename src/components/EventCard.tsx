'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './EventCard.module.css';

interface EventData {
  id: string;
  event_name: string;
  poster: string | null;
  description: string;
  date: string;
  start_time?: string;
  end_time?: string;
  event_date?: string; // For completed events
  venue: string;
  status?: string;
}

interface EventCardProps {
  event: EventData;
  isCompleted?: boolean;
}

export default function EventCard({ event, isCompleted = false }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation up to 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Parse date for the badge
  const dateStr = event.date || event.event_date || '';
  let day = '--';
  let month = '---';
  
  try {
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        day = d.getDate().toString().padStart(2, '0');
        month = d.toLocaleString('default', { month: 'short' });
      } else {
        // Fallback parsing if string is like '2023-11-15'
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          day = parts[2];
          const m = parseInt(parts[1], 10) - 1;
          const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
          month = months[m] || '---';
        }
      }
    }
  } catch (e) {
    // Ignore date parsing errors and fallback
  }

  const timeString = isCompleted 
    ? null 
    : (event.start_time && event.end_time ? `${event.start_time} - ${event.end_time}` : event.start_time || '-');
    
  const status = isCompleted ? 'COMPLETED' : (event.status || 'OPEN');
  const isRegistrationOpen = status === 'OPEN';

  return (
    <div 
      ref={cardRef}
      className={`glass-card ${styles.card}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrapper}>
        {event.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.poster} alt={event.event_name} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No Poster Available</div>
        )}
        
        <div className={styles.dateBadge}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
        </div>
        
        <div className={`${styles.statusBadge} ${styles[status.toLowerCase()] || ''}`}>
          {status}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{event.event_name}</h3>
        <p className={styles.description}>
          {event.description.length > 80 
            ? `${event.description.substring(0, 80)}...` 
            : event.description}
        </p>
        
        <div className={styles.infoList}>
          {timeString && (
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <span className={styles.infoLabel}>Time:</span>
                <span>{timeString}</span>
              </div>
            </div>
          )}
          
          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <span className={styles.infoLabel}>Location:</span>
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link href={isCompleted ? `/gallery/${event.id}` : `/events/${event.id}`} className={styles.btnDetails}>
            Details
          </Link>
          
          {isCompleted ? (
            <Link href={`/gallery/${event.id}`} className={styles.btnRegister} style={{ backgroundColor: 'var(--primary)' }}>
              View Gallery &rarr;
            </Link>
          ) : isRegistrationOpen ? (
            <Link href={`/events/${event.id}/register`} className={styles.btnRegister}>
              Register &rarr;
            </Link>
          ) : (
            <button className={`${styles.btnRegister} ${styles.disabled}`} disabled>
              {status}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
