import React from 'react';
import styles from './Card.module.css';



export function Card({ variant = 'default', children, className = '', ...props }) {
  const rootClass = `${styles.card} ${styles[variant]} ${className}`.trim();
  
  return (
    <div className={rootClass} {...props}>
      {children}
    </div>
  );
}
