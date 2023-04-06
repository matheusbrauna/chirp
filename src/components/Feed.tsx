import { api } from '~/utils/api'
import { PostView } from './PostView'
import { LoadingPage } from './Loading'

export function Feed() {
  const { data, isLoading: postLoading } = api.posts.getAll.useQuery()

  if (postLoading) return <LoadingPage />

  if (!data) return <div>Something went wrong</div>

  return (
    <div className="flex flex-col">
      {data.map((props) => (
        <PostView key={props.post.id} {...props} />
      ))}
    </div>
  )
}
