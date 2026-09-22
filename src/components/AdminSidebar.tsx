'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/app/actions/auth"
import styles from "./AdminSidebar.module.css"

export default function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Upcoming Events', path: '/admin/events' },
    { name: 'Add Event', path: '/admin/events/create' },
    { name: 'Registrations', path: '/admin/registrations' },
    { name: 'Completed Events', path: '/admin/completed-events' },
    { name: 'Add Completed Event', path: '/admin/completed-events/create' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Admin Panel</h2>
        <p>Welcome, {username}</p>
      </div>
      
      <nav className={styles.nav}>
        {links.map((link) => {
          const isActive = pathname === link.path || (link.path !== '/admin' && pathname.startsWith(link.path))
          return (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
      
      <div className={styles.sidebarFooter}>
        <button onClick={() => logout()} className={`btn btn-secondary ${styles.logoutBtn}`}>
          Logout
        </button>
      </div>
    </aside>
  )
}
