import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import axios from 'axios'

const InfiniteQueries = () => {
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
        <button onClick={() => fetchNextPage()}>페이지 불러오기</button>
      </div>
    )
  }

  getPosts()

  return (
    <div>
      <h3>무한 스크롤</h3>
    </div>
  )
}

export default InfiniteQueries
