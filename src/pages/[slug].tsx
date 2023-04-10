import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import Head from 'next/head'

import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import superjson from 'superjson'
import { appRouter } from '~/server/api/root'
import { prisma } from '~/server/db'
import { api } from '~/utils/api'
import { PageLayout } from '~/components/Layout'
import Image from 'next/image'

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  })

  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>{username}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="relative h-48 bg-slate-400">
          <Image
            src={data.profileImageUrl}
            alt={`${data.username ?? ''}s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full border-4 border-black"
          />
        </div>
        <div className="border-b border-slate-400 pt-16">
          <div className="p-4 text-2xl font-bold">{data.username}</div>
        </div>
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  })

  const slug = params?.slug

  if (typeof slug !== 'string') throw new Error('No slug')

  const username = slug.replace('@', '')

  await ssg.profile.getUserByUsername.prefetch({ username })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default ProfilePage
