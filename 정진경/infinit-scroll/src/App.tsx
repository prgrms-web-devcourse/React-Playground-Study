import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

function App() {
  const getPosts = async ({ pageParam = 0 }) => {
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

  const InfiniteScroll = () => {
    const {
      data = { pages: [], pageParams: undefined },
      hasNextPage,
      fetchNextPage,
    } = useInfiniteQuery(['posts'], getPosts, {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length
      },
    })

    useEffect(() => {
      let fetching = false
      const onScroll = async (event: any) => {
        const { scrollHeight, scrollTop, clientHeight } =
          event.target.scrollingElement
        if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
          fetching = true
          if (hasNextPage) {
            await fetchNextPage()
          }
          fetching = false
        }
      }
      document.addEventListener('scroll', onScroll)
      return () => {
        document.removeEventListener('scroll', onScroll)
      }
    }, [data, hasNextPage, fetchNextPage])

    return (
      <div>
        <ul>
          {data.pages.map((page: any) =>
            page.map((item: any) => (
              <li style={{ marginBottom: '500px', fontSize: '20px' }}>
                {item.title}
              </li>
            ))
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
        <InfiniteScroll />
      </div>
    </QueryClientProvider>
  )
}

export default App
