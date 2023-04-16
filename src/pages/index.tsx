import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { useUser } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} loading={isLoading}>
      <div className={styles.main}>
        {isLoading && <p>Loading login info...</p>}
      </div>
    </Layout>
  )
}
