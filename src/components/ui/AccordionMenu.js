'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './AccordionMenu.module.css';

// The side menu. `menu` holds the forum's discussion categories and article
// topics (from loadMenu); without it the designed sample entries show.
const SAMPLE_DISCUSSIONS = ['General', 'Tax & Legal', 'Technology'].map((name) => ({ name, href: '/discussions' }));
const SAMPLE_ARTICLES = ['Practice Operations', 'Structures and Cross-Border', 'Allocation Trends', 'Technology and AI', 'Reporting and Accounting'].map((name) => ({ name, href: '/insights' }));

export function AccordionMenu({ menu = null }) {
  const discussions = menu?.discussions?.length ? menu.discussions : SAMPLE_DISCUSSIONS;
  const articles = menu?.articles?.length ? menu.articles : SAMPLE_ARTICLES;
  // Two columns, as in the design.
  const half = Math.ceil(articles.length / 2);
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
            {discussions.map((c) => (
              <Link key={c.name} href={c.href} className={styles.submenuLink}>{c.name}</Link>
            ))}
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
            {articles.slice(0, half).map((c) => (
              <Link key={c.name} href={c.href} className={styles.submenuLink}>{c.name}</Link>
            ))}
          </div>
          <div>
            {articles.slice(half).map((c) => (
              <Link key={c.name} href={c.href} className={styles.submenuLink}>{c.name}</Link>
            ))}
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
        <Link href="/about" className={styles.menuItemHeader}>
          <span>About Us</span>
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
