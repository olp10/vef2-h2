import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Layout from '../src/components/Layout'
import { User } from '../src/interfaces'

type ProfileCardProps = {
  user: User
}

export function ProfileCard ({ user }: ProfileCardProps) {
    return (
        <>
          <h1>Profile</h1>
    
          <div>
            <h3>Profile (client rendered)</h3>
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p>
          </div>
        </>
      )
}

type ProfileProps = {
    user?: any,
    isLoading: boolean
  }

export default function Profile({ user, isLoading }: ProfileProps) {
    return (
        <Layout user={user} loading={isLoading}>
          {isLoading ? <>Loading...</> : <ProfileCard user={user} />}
        </Layout>
      )
}