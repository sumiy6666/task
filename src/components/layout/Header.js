'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { AccordionMenu } from '../ui/AccordionMenu';
import { usePathname, useRouter } from 'next/navigation';
import { MessageSquare, Search } from 'lucide-react';
import { MessagesModal } from '../profile/MessagesModal';

// `user` is the signed-in Discourse member (null for a guest). `canSignIn`
// is false in demo mode, where there is no forum to sign in to.
export function Header({ user = null, canSignIn = false }) {
  // Only one of the menu, the profile menu and the phone search box is open
  // at a time: opening one closes the others.
  const [openPanel, setOpenPanel] = useState(null); // 'menu' | 'profile' | 'search'
  const isMenuOpen = openPanel === 'menu';
  const isProfileOpen = openPanel === 'profile';
  const isSearchOpen = openPanel === 'search';
  const toggle = (panel) => setOpenPanel((open) => (open === panel ? null : panel));
  const closePanels = () => setOpenPanel(null);
  const headerRef = useRef(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  // Once the page scrolls, the sticky header gets its own background.
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const pathname = usePathname() || '/';
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // A click outside the header, or Escape, closes whatever is open.
  useEffect(() => {
    if (!openPanel) return;
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpenPanel(null);
    };
    const onKey = (e) => e.key === 'Escape' && setOpenPanel(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openPanel]);

  const submitSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    closePanels();
    router.push(`/discussions?q=${encodeURIComponent(term)}`);
  };


  return (
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <img src="/images/logo-community.png" alt="AV COMMUNITY" width={231} height={37} />
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.chatButton}`}
            aria-label="Messages"
            aria-haspopup="dialog"
            onClick={() => {
              closePanels();
              setIsMessagesOpen(true);
            }}
          >
            <MessageSquare size={22} strokeWidth={1.6} />
            <span className={styles.dot} aria-hidden="true" />
          </button>

          <form className={styles.searchPill} role="search" onSubmit={submitSearch}>
            <Search size={22} strokeWidth={1.6} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search Here"
              aria-label="Search the community"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.searchToggle}`}
            aria-label="Search"
            aria-expanded={isSearchOpen}
            onClick={() => toggle('search')}
          >
            <Search size={22} strokeWidth={1.6} />
          </button>

          {user ? (
            <div className={styles.profileWrap}>
              <button
                type="button"
                className={styles.profile}
                aria-label={`Signed in as ${user.name}`}
                aria-expanded={isProfileOpen}
                onClick={() => toggle('profile')}
              >
                <span className={styles.avatar}>
                  <img src={user.avatar} alt="" />
                </span>
                <span className={styles.dot} aria-hidden="true" />
              </button>
              {isProfileOpen && (
                <div className={styles.profileMenu}>
                  <span className={styles.profileName}>{user.name}</span>
                  <Link href="/profile" className={styles.signOut} onClick={closePanels}>My Profile</Link>
                  {canSignIn && (
                    <form action="/api/auth/logout" method="post">
                      <input type="hidden" name="return" value={pathname} />
                      <button type="submit" className={styles.signOut}>Sign out</button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : canSignIn ? (
            <a href={`/api/auth/login?return=${encodeURIComponent(pathname)}`} className={styles.signIn}>
              Sign in
            </a>
          ) : null}

          <button className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`} aria-label="Menu" aria-expanded={isMenuOpen} onClick={() => toggle('menu')}>
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {isSearchOpen && (
            <form
              className={styles.searchBox}
              role="search"
              onSubmit={submitSearch}
              onKeyDown={(e) => e.key === 'Escape' && closePanels()}
            >
              <Search size={18} strokeWidth={1.6} className={styles.searchIcon} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                className={styles.searchInput}
                placeholder="Search Here"
                aria-label="Search the community"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="button" className={styles.searchClose} aria-label="Close search" onClick={closePanels}>
                &times;
              </button>
            </form>
          )}
        </div>

        <div className={`${styles.sideMenuWrapper} ${isMenuOpen ? styles.open : ''}`}>
          {/* Close once a link is chosen; several share the current path, so
              waiting for the route to change would leave the menu open. */}
          <div className={styles.sideMenuInner} onClick={(e) => e.target.closest('a') && closePanels()}>
            <AccordionMenu />
          </div>
        </div>
      </div>
      {isMessagesOpen && <MessagesModal onClose={() => setIsMessagesOpen(false)} />}
    </header>
  );
}
