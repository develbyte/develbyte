import React from 'react';
import styles from './Logo.module.css';

export default function Logo(): JSX.Element {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoButton}>
        <span className={styles.logoText}>DEVELBYTE</span>
      </div>
    </div>
  );
}
