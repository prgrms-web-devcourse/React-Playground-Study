import axios from 'axios'
function App() {
  const getPosts = async () => {
    const response = await axios.get(
      'https://kdt.frontend.4th.programmers.co.kr:5011/posts/channel/64f843de36f4f3110a635033'
    )
    console.log(response.data)
    return response.data
  }
  getPosts()
  return (
    <div>
      <h1>포스트 불러오기 연습중</h1>
    </div>
  )
}

export default App
