'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './AccordionMenu.module.css';

export function AccordionMenu() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (item) => setExpandedItem(expandedItem === item ? null : item);

  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItem}>
        <div className={`${styles.menuItemHeader} ${expandedItem === 'Discussions' ? styles.active : ''}`} onClick={() => toggleItem('Discussions')}>
          <span style={{ color: expandedItem === 'Discussions' ? '#00A4E4' : 'inherit' }}>Discussions</span>
          <span className={styles.expandIcon} style={{ color: expandedItem === 'Discussions' ? '#00A4E4' : 'inherit' }}>{expandedItem === 'Discussions' ? '-' : '+'}</span>
        </div>
        <div className={`${styles.submenu} ${expandedItem === 'Discussions' ? styles.open : ''}`}>
          <div>
            <Link href="/conversations/new" className={`${styles.submenuLink} ${styles.highlight}`}>Start a conversation</Link>
            <Link href="/discussions" className={styles.submenuLink}>General</Link>
            <Link href="/discussions" className={styles.submenuLink}>Tax & Legal</Link>
            <Link href="/discussions" className={styles.submenuLink}>Technology</Link>
          </div>
        </div>
      </li>
      <li className={styles.menuItem}>
        <div className={`${styles.menuItemHeader} ${expandedItem === 'Articles' ? styles.active : ''}`} onClick={() => toggleItem('Articles')}>
          <span style={{ color: expandedItem === 'Articles' ? '#00A4E4' : 'inherit' }}>Articles</span>
          <span className={styles.expandIcon} style={{ color: expandedItem === 'Articles' ? '#00A4E4' : 'inherit' }}>{expandedItem === 'Articles' ? '-' : '+'}</span>
        </div>
        <div className={`${styles.submenu} ${expandedItem === 'Articles' ? styles.open : ''}`}>
          <div>
            <Link href="/insights" className={`${styles.submenuLink} ${styles.highlight}`}>Latest article</Link>
            <Link href="/insights" className={styles.submenuLink}>Practice Operations</Link>
            <Link href="/insights" className={styles.submenuLink}>Structures and Cross-Border</Link>
          </div>
          <div>
            <Link href="/insights" className={styles.submenuLink}>Allocation Trends</Link>
            <Link href="/insights" className={styles.submenuLink}>Technology and AI</Link>
            <Link href="/insights" className={styles.submenuLink}>Reporting and Accounting</Link>
          </div>
        </div>
      </li>
      <li className={styles.menuItem}>
        <div className={`${styles.menuItemHeader} ${expandedItem === 'Polls' ? styles.active : ''}`} onClick={() => toggleItem('Polls')}>
          <span style={{ color: expandedItem === 'Polls' ? '#00A4E4' : 'inherit' }}>Polls</span>
          <span className={styles.expandIcon} style={{ color: expandedItem === 'Polls' ? '#00A4E4' : 'inherit' }}>{expandedItem === 'Polls' ? '-' : '+'}</span>
        </div>
        <div className={`${styles.submenu} ${expandedItem === 'Polls' ? styles.open : ''}`}>
          <div>
            <Link href="/conversations/new?type=poll" className={`${styles.submenuLink} ${styles.highlight}`}>Create a poll</Link>
            <Link href="/poll" className={styles.submenuLink}>Recent Polls</Link>
            <Link href="/poll" className={styles.submenuLink}>Upcoming Polls</Link>
          </div>
        </div>
      </li>
      <li className={styles.menuItem}>
        <div className={`${styles.menuItemHeader} ${expandedItem === 'Events' ? styles.active : ''}`} onClick={() => toggleItem('Events')}>
          <span style={{ color: expandedItem === 'Events' ? '#00A4E4' : 'inherit' }}>Events</span>
          <span className={styles.expandIcon} style={{ color: expandedItem === 'Events' ? '#00A4E4' : 'inherit' }}>{expandedItem === 'Events' ? '-' : '+'}</span>
        </div>
        <div className={`${styles.submenu} ${expandedItem === 'Events' ? styles.open : ''}`}>
          <div>
            <Link href="/events" className={styles.submenuLink}>Webinars</Link>
            <Link href="/events" className={styles.submenuLink}>Conferences</Link>
          </div>
        </div>
      </li>
      <li className={styles.menuItem}>
        <Link href="/members" className={styles.menuItemHeader}>
          <span>Members</span>
          <span className={styles.expandIcon}>+</span>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <div className={styles.menuItemHeader} onClick={() => toggleItem('My Dashboard')}>
          <span>My Dashboard</span>
          <span className={styles.expandIcon}>{expandedItem === 'My Dashboard' ? '-' : '+'}</span>
        </div>
      </li>
    </ul>
  );
}
