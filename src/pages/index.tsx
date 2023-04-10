import { SignInButton, useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import { CreatePostWizard } from '~/components/CreatePostWizard'
import { Feed } from '~/components/Feed'
import { PageLayout } from '~/components/Layout'
import { api } from '~/utils/api'

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser()
  api.posts.getAll.useQuery()

  // Return empty if user ins't loaded yet
  if (!userLoaded) return <div />

  return (
    <>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  )
}

export default Home
