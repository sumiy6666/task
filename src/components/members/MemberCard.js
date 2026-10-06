import styles from './Members.module.css';

export default function MemberCard({ member, isActive, onClick }) {
  return (
    <div onClick={onClick} className={`${styles.row} ${isActive ? styles.rowActive : ''}`}>
      <img src={member.avatar} alt={member.name} className={styles.rowAvatar} />

      <div className="flex-1 min-w-0">
        <div className={styles.rowName}>{member.name}</div>
        <div className={styles.rowRole}>
          {member.role}
          {member.company && (
            <>
              <span className={styles.rowSep}>|</span>
              {member.company}
            </>
          )}
        </div>
        {member.expertise.length > 0 && (
          <div className={styles.rowExpertise}>
            <span className={styles.rowExpertiseLabel}>Expertise:</span>
            <span className={styles.tags}>
              {member.expertise.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
