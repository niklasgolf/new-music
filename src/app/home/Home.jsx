"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import styles from './home.module.css';
import { MelodyProvider } from '../../components/finder/MelodyContext';
import EditMelody from '../../components/finder/EditMelody';
import ConditionalSheetMusic from '../../components/ConditionalSheetMusic';
import Finder from '../../components/finder/Finder';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.welcomeMessage}>Hello {user.email}</p>
        </div>
        <div className={styles.headerCenter}>
          <Link href="/database">
            <h1>Database</h1>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>
      <MelodyProvider>
        <div className={styles.mainContent}>
          <div className={`${styles.gridItem} ${styles.gridItem1}`}>
            <Finder />
            <ConditionalSheetMusic />
          </div>
          <div className={`${styles.gridItem} ${styles.gridItem2}`}>
            <EditMelody />
          </div>
          <div className={`${styles.gridItem} ${styles.gridItem3}`}></div>
          <div className={`${styles.gridItem} ${styles.gridItem4}`}></div>
        </div>
      </MelodyProvider>
    </div>
  );
}
