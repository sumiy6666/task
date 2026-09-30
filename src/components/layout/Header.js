'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { AccordionMenu } from '../ui/AccordionMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <img src="/images/logo.svg" alt="AV CIRCLE" style={{ height: '28px' }} />
        </Link>

        <div className={styles.actions}>
          <div className={styles.iconNav}>
            <Link href="/" className={styles.iconButton} aria-label="Home">
              <img src="/images/icon1home.svg" alt="" style={{ width: '20px', height: '20px' }} />
            </Link>
            <Link href="/conversations/new" className={styles.iconButton} aria-label="Start a conversation">
              <img src="/images/icon2msg.svg" alt="" style={{ width: '20px', height: '20px' }} />
            </Link>
            <button className={styles.iconButton} aria-label="Search">
              <img src="/images/icon3search.svg" alt="Search" style={{ width: '20px', height: '20px' }} />
            </button>
            <Link href="/discussions" className={styles.iconButton} aria-label="Discussions">
              <img src="/images/icon1coversation.svg" alt="" style={{ width: '20px', height: '20px' }} />
            </Link>

            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src="https://i.pravatar.cc/100?img=33" alt="User Avatar" />
              </div>
            </div>

          </div>



          <button className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`} aria-label="Menu" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div className={`${styles.sideMenuWrapper} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.sideMenuInner}>
            <AccordionMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
