import Image from 'next/image'
import { type RouterOutputs } from '~/utils/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type PostViewProps = RouterOutputs['posts']['getAll'][number]

export function PostView(props: PostViewProps) {
  const { post, author } = props
  return (
    <div className="flex items-center gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username}'s profile picture`}
        width={56}
        height={56}
        priority
        quality={100}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>{`@${author.username}`}</span>
          <span className="font-extralight">{`· ${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  )
}
