'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { AccordionMenu } from '../ui/AccordionMenu';
import { usePathname, useRouter } from 'next/navigation';

// `user` is the signed-in Discourse member (null for a guest). `canSignIn`
// is false in demo mode, where there is no forum to sign in to.
export function Header({ user = null, canSignIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const pathname = usePathname() || '/';
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    setIsSearchOpen(false);
    router.push(`/discussions?q=${encodeURIComponent(term)}`);
  };

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
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Search"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((open) => !open)}
            >
              <img src="/images/icon3search.svg" alt="" style={{ width: '20px', height: '20px' }} />
            </button>
            <Link href="/discussions" className={styles.iconButton} aria-label="Discussions">
              <img src="/images/icon1coversation.svg" alt="" style={{ width: '20px', height: '20px' }} />
            </Link>

            {user ? (
              <div className={styles.profileWrap}>
                <button
                  type="button"
                  className={styles.profile}
                  aria-label={`Signed in as ${user.name}`}
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((open) => !open)}
                >
                  <span className={styles.avatar}>
                    <img src={user.avatar} alt="" />
                  </span>
                </button>
                {isProfileOpen && canSignIn && (
                  <div className={styles.profileMenu}>
                    <span className={styles.profileName}>{user.name}</span>
                    <form action="/api/auth/logout" method="post">
                      <input type="hidden" name="return" value={pathname} />
                      <button type="submit" className={styles.signOut}>Sign out</button>
                    </form>
                  </div>
                )}
              </div>
            ) : canSignIn ? (
              <a href={`/api/auth/login?return=${encodeURIComponent(pathname)}`} className={styles.signIn}>
                Sign in
              </a>
            ) : null}

            {isSearchOpen && (
              <form
                className={styles.searchBox}
                role="search"
                onSubmit={submitSearch}
                onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
              >
                <img src="/images/icon3search.svg" alt="" style={{ width: '18px', height: '18px' }} />
                <input
                  ref={searchInputRef}
                  type="search"
                  className={styles.searchInput}
                  placeholder="Search the community..."
                  aria-label="Search the community"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" className={styles.searchClose} aria-label="Close search" onClick={() => setIsSearchOpen(false)}>
                  &times;
                </button>
              </form>
            )}
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
          {/* Close once a link is chosen; several share the current path, so
              waiting for the route to change would leave the menu open. */}
          <div className={styles.sideMenuInner} onClick={(e) => e.target.closest('a') && setIsMenuOpen(false)}>
            <AccordionMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
