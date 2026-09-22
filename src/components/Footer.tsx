import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Electrical Club</h3>
          <p className={styles.footerText}>
            Department of Electrical and Electronics Engineering<br />
            V.S.B. Engineering College, Karur
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Links</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Upcoming Events</a></li>
            <li><a href="/gallery">Completed Events</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {currentYear} Electrical Club, VSBEC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
