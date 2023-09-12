import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

function App() {
  const getPosts = async ({ pageParam = 0 }) => {
    console.log('fetch')
    const response = await axios
      .get(
        'https://kdt.frontend.4th.programmers.co.kr:5011/posts/channel/64f843de36f4f3110a635033',
        {
          params: {
            limit: 5,
            offset: pageParam * 5,
          },
        }
      )
      .then((res) => res.data)
    return response
  }

  const InfiniteScrollComponent = () => {
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
      ['posts'],
      getPosts,
      {
        getNextPageParam: (lastPage, allPages) => {
          const currentPage = lastPage.pageParam + 1
          if (allPages.some((page) => page.pageParam === currentPage)) {
            return undefined
          }
          return currentPage
        },
      }
    )
    console.log(data)

    return (
      <div>
        <ul>
          {/* {data?.pages[0].map((page: any) => (
            <li>{page.title}</li>
          ))} */}
          {data?.pages.map((page: any) =>
            page?.data.map((post: any) => <li key={post._id}>{post.title}</li>)
          )}
        </ul>
        <button onClick={() => fetchNextPage()}>페이지 불러오기</button>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>포스트 리스트 목록</h1>
        <InfiniteScrollComponent />
      </div>
    </QueryClientProvider>
  )
}

export default App
