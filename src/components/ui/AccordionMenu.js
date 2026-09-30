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
            <a href="#" className={styles.submenuLink}>General</a>
            <a href="#" className={styles.submenuLink}>Tax & Legal</a>
            <a href="#" className={styles.submenuLink}>Technology</a>
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
            <a href="#" className={`${styles.submenuLink} ${styles.highlight}`}>Latest article</a>
            <a href="#" className={styles.submenuLink}>Practice Operations</a>
            <a href="#" className={styles.submenuLink}>Structures and Cross-Border</a>
          </div>
          <div>
            <a href="#" className={styles.submenuLink}>Allocation Trends</a>
            <a href="#" className={styles.submenuLink}>Technology and AI</a>
            <a href="#" className={styles.submenuLink}>Reporting and Accounting</a>
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
            <a href="#" className={styles.submenuLink}>Upcoming Polls</a>
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
            <a href="#" className={styles.submenuLink}>Conferences</a>
          </div>
        </div>
      </li>
      <li className={styles.menuItem}>
        <div className={styles.menuItemHeader} onClick={() => toggleItem('Members')}>
          <span>Members</span>
          <span className={styles.expandIcon}>{expandedItem === 'Members' ? '-' : '+'}</span>
        </div>
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
