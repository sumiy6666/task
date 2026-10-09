import { Reveal } from '@/components/ui/Reveal';
import styles from './Members.module.css';

export default function MemberDetail({ member }) {
  if (!member) return null;

  const stats = [
    { label: 'DISCUSSIONS\nSTARTED', value: member.stats.discussions },
    { label: 'CONTRIBUTIONS', value: member.stats.contributions },
    { label: member.stats.followersLabel || 'FOLLOWERS', value: member.stats.followers }
  ];

  return (
    <Reveal stagger={120} className={styles.detail}>
      {/* Top profile info */}
      <div className={styles.profile}>
        <img src={member.avatar} alt={member.name} className={styles.profileAvatar} />
        <div className="flex flex-col min-w-0">
          <h2 className={styles.profileName}>{member.name}</h2>
          <span className={styles.profileRole}>{member.role}</span>
          {member.company && <span className={styles.profileCompany}>{member.company}</span>}
          {member.location && (
            <div className={styles.profileLocation}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-10a7 7 0 1 1 14 0c0 4.5-7 10-7 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              {member.location}
            </div>
          )}
        </div>
      </div>

      {/* Expertise */}
      {member.expertise.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Expertise</h3>
          <div className={styles.tags}>
            {member.expertise.map((tag) => (
              <span key={tag} className={`cursor-pointer ${styles.tag}`}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Bio */}
      <div className={`${styles.section} ${styles.sectionPlain}`}>
        <h3 className={styles.sectionTitle}>Bio</h3>
        <p className={styles.sectionText}>{member.bio || 'No bio yet.'}</p>
      </div>

      {/* Stats cards */}
      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <button type="button" className={styles.follow}>FOLLOW</button>
    </Reveal>
  );
}
