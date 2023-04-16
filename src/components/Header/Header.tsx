/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import './Header.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type HeaderProps = {
  user?: any,
  loading: boolean
}

export default function Header({ user, loading }: HeaderProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router.pathname]);

  return (
      <header>
        <nav>
          <ul>
            <li>
              {current === '/' && <Link href="/"><strong>Heim</strong></Link>}
              {current !== '/' && <Link href="/">Heim</Link>}
            </li>
            <li>
              {current === '/recipes' && <Link href="/recipes"><strong>Allar uppskriftir</strong></Link>} 
              {current !== '/recipes' && <Link href="/recipes">Allar Uppskriftir</Link>}
            </li>
            {!loading &&
              (user ? (
                <li>
                  <a href="/api/auth/logout">Logout</a>
                </li>
              ) : (
                <li>
                  <a href="/api/auth/login">Login</a>
                </li>
              ))}
            
          </ul>
        </nav>
      </header>
  )
}