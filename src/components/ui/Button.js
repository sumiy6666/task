import React from 'react';
import Link from 'next/link';
import { isTopicHref } from '@/lib/links';
import styles from './Button.module.css';



export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  href,
  ...props
}) {
  const rootClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  // With `href` the button navigates, rendered as a link so it stays valid HTML.
  if (href) {
    return (
      <Link href={href} prefetch={isTopicHref(href) ? false : undefined} className={rootClass} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={rootClass} {...props}>
      {content}
    </button>
  );
}
