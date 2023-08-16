import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 이렇게 단언해주는 게 맞을까? 아니면 어떤 가드를 사용해야할까?!
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
