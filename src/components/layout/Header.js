'use client';
import React, { useState } from 'react';
import styles from './Header.module.css';
import { AccordionMenu } from '../ui/AccordionMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <img src="/images/logo.svg" alt="AV CIRCLE" style={{ height: '28px' }} />
        </div>

        <div className={styles.actions}>
          <div className={styles.iconNav}>
            <button className={styles.iconButton} aria-label="Home">
              <img src="/images/icon1home.svg" alt="Home" style={{ width: '20px', height: '20px' }} />
            </button>
            <button className={styles.iconButton} aria-label="Messages">
              <img src="/images/icon2msg.svg" alt="Messages" style={{ width: '20px', height: '20px' }} />
            </button>
            <button className={styles.iconButton} aria-label="Search">
              <img src="/images/icon3search.svg" alt="Search" style={{ width: '20px', height: '20px' }} />
            </button>
            <button className={styles.iconButton} aria-label="Conversations">
              <img src="/images/icon1coversation.svg" alt="Conversations" style={{ width: '20px', height: '20px' }} />
            </button>

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
