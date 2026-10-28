import { BadgeCheck, CalendarCheck, MapPin, Pencil, UserRound } from 'lucide-react';
import styles from './Profile.module.css';

// Blue header card: photo, name, handle, bio, follow counts and actions.
export function ProfileHeader({ profile }) {
  return (
    <section className={styles.hero} aria-label="Profile">
      <div className={`rise-in ${styles.avatarWrap}`}>
        <img className={styles.avatar} src={profile.avatar} alt="" />
        <span className={styles.verified} title="Verified member" aria-label="Verified member" role="img">
          <BadgeCheck aria-hidden="true" />
        </span>
      </div>

      <div className={styles.heroInfo}>
        <h1 className={`rise-in ${styles.name}`} style={{ '--delay': '0.1s' }}>{profile.name}</h1>
        <p className={`rise-in ${styles.handle}`} style={{ '--delay': '0.15s' }}>@{profile.username}</p>
        {profile.bio && <p className={`rise-in ${styles.bio}`} style={{ '--delay': '0.2s' }}>{profile.bio}</p>}
        {/* The forum has no followers, so a forum profile leaves this out. */}
        {profile.followers != null && (
          <div className={`rise-in ${styles.follows}`} style={{ '--delay': '0.25s' }}>
            <span>{profile.followers} Followers</span>
            <span>{profile.following} Following</span>
          </div>
        )}
        <div className={`rise-in ${styles.metaRow}`} style={{ '--delay': '0.3s' }}>
          {profile.location && <span className={styles.metaItem}><MapPin strokeWidth={1.5} aria-hidden="true" />{profile.location}</span>}
          {profile.memberSince && <span className={styles.metaItem}><CalendarCheck strokeWidth={1.5} aria-hidden="true" />Member since {profile.memberSince}</span>}
        </div>
      </div>

      <div className={styles.heroActions}>
        {profile.editHref ? (
          // Profile details are edited on the forum.
          <a href={profile.editHref} target="_blank" rel="noopener noreferrer" className={`${styles.heroBtn} ${styles.editBtn}`}>
            <Pencil strokeWidth={1.5} aria-hidden="true" />Edit Profile
          </a>
        ) : (
          <button type="button" className={`${styles.heroBtn} ${styles.editBtn}`}>
            <Pencil strokeWidth={1.5} aria-hidden="true" />Edit Profile
          </button>
        )}
        {/* The member's role on the forum, shown as a label (it opens nothing). */}
        {profile.role && (
          <span className={`${styles.heroBtn} ${styles.roleBtn}`}>
            <UserRound strokeWidth={1.5} aria-hidden="true" />{profile.role}
          </span>
        )}
      </div>
    </section>
  );
}
