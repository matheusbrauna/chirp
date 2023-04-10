import { type PropsWithChildren } from 'react'

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full overflow-y-auto border-x border-slate-400 md:max-w-2xl">
        {children}
      </div>
    </main>
  )
}
