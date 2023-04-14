import Link from 'next/link';
import styles from './Footer.module.scss'; // Virkar ekki :(
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Footer() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let loginInfo = null;
    try {
      loginInfo = JSON.parse(Cookies.get('loginInfo') || '');
    } catch (error) {
      console.error('Error parsing login info:', error);
    }
    if (loginInfo) {
      setLoggedIn(true);
    }
  }, []);
  
  return (
    <>
      <footer>
        {loggedIn === true && (
          <Link href="/users/logout">Útskráning</Link>
        )}
        {loggedIn === false && (
          <Link href="/users/login">Innskráning stjórnanda</Link>
        )}
        <p className={styles.copyright}>&copy; <em>Hópur #2</em></p>
      </footer>
    </>
  )
}
