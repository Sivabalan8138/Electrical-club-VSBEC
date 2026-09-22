'use client'

import { useState } from 'react'
import styles from './GalleryLightbox.module.css'

interface Photo {
  id: string
  image_url: string
}

export default function GalleryLightbox({ photos }: { photos: Photo[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length)
    }
  }
  
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }
  }

  if (photos.length === 0) {
    return <p>No photos available for this event.</p>
  }

  return (
    <>
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <div key={photo.id} className={styles.thumbnailContainer} onClick={() => openLightbox(index)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.image_url} alt="Event Photo" className={styles.thumbnail} />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>&times;</button>
          
          <button className={styles.navBtn} style={{ left: '20px' }} onClick={prevPhoto}>
            &#10094;
          </button>
          
          <div className={styles.mainImageContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photos[selectedIndex].image_url} 
              alt="Event Photo Enlarge" 
              className={styles.mainImage} 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
          
          <button className={styles.navBtn} style={{ right: '20px' }} onClick={nextPhoto}>
            &#10095;
          </button>
        </div>
      )}
    </>
  )
}
