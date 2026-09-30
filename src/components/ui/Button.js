import React from 'react';
import styles from './Button.module.css';



export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  asChild,
  ...props
}) {
  const rootClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  // If we just want to wrap a link or something else, we might need a slot approach,
  // but for simplicity we will just render a button.
  
  return (
    <button className={rootClass} {...props}>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
