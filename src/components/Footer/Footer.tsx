import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './Footer.module.scss'; // Virkar ekki :(

export default function Footer() {
  const { user, isLoading } = useUser();
   
  return (
    <>
    
      <footer>
        <p className={styles.copyright}>&copy; <em>Hópur #2</em></p>
        {user && (
        <>
          <div>
            <p>Logged in as {user.nickname}</p>
          </div>
        </>
      )}
      </footer>
    </>
  )
}
