import { CalendarCheck, ChevronDown, MapPin, Pencil, UserRound } from 'lucide-react';
import styles from './Profile.module.css';

// Blue header card: photo, name, handle, bio, follow counts and actions.
export function ProfileHeader({ profile }) {
  return (
    <section className={styles.hero} aria-label="Profile">
      <div className={`rise-in ${styles.avatarWrap}`}>
        <img className={styles.avatar} src={profile.avatar} alt="" />
        <span className={styles.online} title="Online" />
      </div>

      <div className={styles.heroInfo}>
        <h1 className={`rise-in ${styles.name}`} style={{ '--delay': '0.1s' }}>{profile.name}</h1>
        <p className={`rise-in ${styles.handle}`} style={{ '--delay': '0.15s' }}>@{profile.username}</p>
        {profile.bio && <p className={`rise-in ${styles.bio}`} style={{ '--delay': '0.2s' }}>{profile.bio}</p>}
        <div className={`rise-in ${styles.follows}`} style={{ '--delay': '0.25s' }}>
          <span>{profile.followers} Followers</span>
          <span>{profile.following} Following</span>
        </div>
        <div className={`rise-in ${styles.metaRow}`} style={{ '--delay': '0.3s' }}>
          {profile.location && <span className={styles.metaItem}><MapPin strokeWidth={1.5} aria-hidden="true" />{profile.location}</span>}
          {profile.memberSince && <span className={styles.metaItem}><CalendarCheck strokeWidth={1.5} aria-hidden="true" />Member since {profile.memberSince}</span>}
        </div>
      </div>

      <div className={styles.heroActions}>
        <button type="button" className={`${styles.heroBtn} ${styles.editBtn}`}>
          <Pencil strokeWidth={1.5} aria-hidden="true" />Edit Profile
        </button>
        {profile.role && (
          <button type="button" className={`${styles.heroBtn} ${styles.roleBtn}`}>
            <UserRound strokeWidth={1.5} aria-hidden="true" />{profile.role}
            <ChevronDown strokeWidth={1.5} className={styles.chevron} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
