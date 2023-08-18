import './App.css'
import React, { useState } from 'react'
import Header from './components/Header'
import { EmojiListItem, SearchBox } from './components'

function App() {
  const [keyword, setKeyword] = useState('')

  return (
    <div className='App'>
      <Header />
      <SearchBox onSearch={setKeyword} />
      {/* <EmojiListItem emoji={emojiJson[0]} /> Json 파일이 없음*/}
    </div>
  )
}

export default App
