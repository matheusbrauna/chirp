import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import { LoadingSpinner } from './Loading'

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
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to post! Please try again later.')
      }
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (input !== '') {
              mutate({
                content: input,
              })
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== '' && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="grid place-items-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  )
}
