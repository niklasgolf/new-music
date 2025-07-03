"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NotMember.module.css';

export default function NotMember() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.message}>You are not authorized to access this application.</h1>
        <p className={styles.countdown}>Redirecting to login page in {countdown} seconds...</p>
      </div>
    </div>
  );
}
