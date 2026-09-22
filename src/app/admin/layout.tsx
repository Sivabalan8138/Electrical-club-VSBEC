import { getSession } from "@/lib/session"
import AdminSidebar from "@/components/AdminSidebar"
import styles from "./admin.module.css"
import "@/app/globals.css"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    return (
      <div className={styles.loginLayout}>
        {children}
      </div>
    )
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar username={session.username!} />
      <div className={styles.adminContent}>
        {children}
      </div>
    </div>
  )
}
