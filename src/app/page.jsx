"use client";
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        router.push('/home');
      } else {
        await auth.signOut();
        router.push('/notmember');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <button onClick={handleLogin} className={styles.loginButton}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
