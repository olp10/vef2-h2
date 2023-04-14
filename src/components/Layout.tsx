import Header from '@/components/Header/Header'
import Head from 'next/head'

type LayoutProps = {
    user?: any,
    loading?: boolean,
    children: React.ReactNode
}

export default function Layout({ user, loading = false, children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>Uppskriftasíðan</title>
            </Head>

            <Header user={user} loading={loading} />

            <main>
                <div>{children}</div>
            </main>

        </>
    )
}