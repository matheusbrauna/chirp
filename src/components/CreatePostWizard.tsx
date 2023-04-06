import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { api } from '~/utils/api'

export function CreatePostWizard() {
  const { user } = useUser()
  const [input, setInput] = useState('')
  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('')
      // eslint-disable-next-line no-void
      void ctx.posts.getAll.invalidate()
    },
  })

  if (!user) return null

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        width={56}
        height={56}
        priority
        quality={100}
        className="rounded-full"
      />
      <input
        type="text"
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button disabled={isPosting} onClick={() => mutate({ content: input })}>
        Post
      </button>
    </div>
  )
}
