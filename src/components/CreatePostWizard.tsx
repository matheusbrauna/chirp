import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

export function CreatePostWizard() {
  const { user } = useUser()

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
      />
    </div>
  )
}
