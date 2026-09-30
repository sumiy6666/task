'use client';
import React from 'react';
import styles from './Footer.module.css';
import { AccordionMenu } from '../ui/AccordionMenu';

export function Footer() {
  return (
    <div className="container" style={{ marginTop: '0rem', marginBottom: '2rem' }}>
      <footer className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.leftCol}>
            <AccordionMenu />
          </div>
          <div className={styles.rightCol}>
            <div className={styles.stayLoopCard}>
              <h3>Stay in Loop</h3>
              <p>Subscribe to get the latest insights, events and updates from AV CIRCLE.</p>
              <form className={styles.loopForm}>
                <input type="email" placeholder="Enter your email" />
                <button type="submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
            </div>

            <div className={styles.iconLinks}>
              <a href="#"><div className={styles.iconCircle}><img src="/images/Vector1.svg" alt="AV Product" className={styles.icon} /></div> AV Product</a>
              <a href="#"><div className={styles.iconCircle}><img src="/images/Icon4.svg" alt="Support" className={styles.icon} /></div> Support</a>
              <a href="#"><div className={styles.iconCircle}><img src="/images/Icon5.svg" alt="Profile" className={styles.icon} /></div> Profile</a>
              <a href="#"><div className={styles.iconCircle}><img src="/images/Icon6.svg" alt="Notification" className={styles.icon} /></div> Notification</a>
              <a href="#"><div className={styles.iconCircle}><img src="/images/Vector2.svg" alt="AI Assistance" className={styles.icon} /></div> AI Assistance</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; 2026 AV CIRCLE. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <span className={styles.separator}>|</span>
            <a href="#">Terms of use</a>
            <span className={styles.separator}>|</span>
            <a href="#">Community Guidelines</a>
            <span className={styles.separator}>|</span>
            <a href="#">Site Feedback</a>
            <span className={styles.separator}>|</span>
            <a href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
