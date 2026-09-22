import styles from "../page.module.css";

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '4rem 20px', minHeight: '80vh' }}>
      <h1 className={styles.sectionTitle}>About Electrical Club</h1>
      
      <div className={`glass-card ${styles.aboutCard}`} style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', lineHeight: '1.8' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Department of Electrical and Electronics Engineering
        </h2>
        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '3rem', textAlign: 'center' }}>
          V.S.B. Engineering College, Karur
        </h3>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Our Vision</h3>
          <p style={{ color: 'var(--text-primary)' }}>
            To foster innovation, technical excellence, and practical skills among students, bridging the gap between theoretical knowledge and practical application in the field of electrical engineering.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>What We Do</h3>
          <p style={{ color: 'var(--text-primary)' }}>
            The Electrical Club organizes a variety of technical and non-technical activities throughout the academic year. From hands-on circuit building workshops and technical symposiums to idea presentation events and hackathons, we provide a platform for students to showcase their talents and learn from peers and industry experts.
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Join Us</h3>
          <p style={{ color: 'var(--text-primary)' }}>
            Whether you are passionate about power systems, embedded electronics, or just starting your journey in electrical engineering, the Electrical Club is the perfect place for you. Participate in our upcoming events to learn, compete, innovate, and build the future!
          </p>
        </div>
      </div>
    </div>
  );
}
