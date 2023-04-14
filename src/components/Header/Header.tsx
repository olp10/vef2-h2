/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import './Header.module.scss';

type HeaderProps = {
  user?: any,
  loading: boolean
}

export default function Header({ user, loading }: HeaderProps) {
  return (
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Heim</Link>
            </li>
            <li>
              <Link href="/recipes">Allar uppskriftir</Link>
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