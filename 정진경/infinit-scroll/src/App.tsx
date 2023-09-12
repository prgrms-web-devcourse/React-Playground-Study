import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { limits } from 'argon2'

const queryClient = new QueryClient()

function App() {
  const getPosts = async () => {
    const response = await axios
      .get(
        'https://kdt.frontend.4th.programmers.co.kr:5011/posts/channel/64f843de36f4f3110a635033',
        {
          params: {
            limit: 5,
            offset: 0,
          },
        }
      )
      .then((res) => res.data)
    console.log('getposts 확인', response)
    return response
  }

  const InfiniteScrollComponent = () => {
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
      ['posts'],
      getPosts,
      {
        getNextPageParam: (lastPage) => {},
      }
    )
    console.log('data 확인', data, hasNextPage)

    return (
      <div>
        <ul>
          {data?.pages[0].map((page: any) => (
            <li>{page.title}</li>
          ))}
        </ul>
        {data && data.pages.length > 0 && (
          <button onClick={() => fetchNextPage()}>페이지 불러오기</button>
        )}
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
