import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { useUser } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // FIXME: Login langt frá því að vera klárt
  const { user, isLoading } = useUser();

  // useEffect(() => {
  //   let loginInfo = null;
  //   try {
  //     loginInfo = JSON.parse(Cookies.get('loginInfo') || '');
  //   } catch (error) {
  //     console.error('Error parsing login info:', error);
  //   }
  //   if (loginInfo) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  return (
    <Layout user={user} loading={isLoading}>
      <div className={styles.main}>
        {isLoading && <p>Loading login info...</p>}

        {!isLoading && !user && (
          <>
            <p>
              To test the login click in <i>Login</i>
            </p>
            <p>
              Once you have logged in you should be able to navigate between
              protected routes: client rendered, server rendered profile pages,
              and <i>Logout</i>
            </p>
          </>
        )}

{user && (
        <>
          <div>
            <h4>Innskráning tókst!</h4>
            {typeof user.picture === 'string' &&
              <Image 
              src={user.picture} 
              alt="user picture"
              width={100}
              height={100} 
              />
            }
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p>
          </div>
        </>
      )}
      </div>
    </Layout>
    
  )
}
