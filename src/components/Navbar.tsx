import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.clubName}>Electrical Club</span>
            <span className={styles.collegeName}>VSBEC</span>
          </div>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/events" className={styles.navLink}>Upcoming Events</Link>
          <Link href="/gallery" className={styles.navLink}>Completed Events</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/admin/login" className={`btn ${styles.loginBtn}`}>
            Admin Login
          </Link>
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  )
}
