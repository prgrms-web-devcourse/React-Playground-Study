import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from './InfinitScroll/InfiniteScrollComponent'

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

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>포스트 리스트 목록</h1>
        <InfiniteScroll fetchData={getPosts} />
      </div>
    </QueryClientProvider>
  )
}

export default App
