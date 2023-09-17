import TempModal from './components/TempModal'
import LoginForm from './components/LoginForm'
import { useState } from 'react'

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleLogin = (email, password) => {
    /**  로그인 처리 로직 */
    /** 로그인 성공 시에만 모달을 닫을 수 있게 해야 한다.  */
    setIsModalOpened(false)
  }

  return (
    <div className='App'>
      App component
      <button onClick={() => setIsModalOpened(true)}>Open modal</button>
      <TempModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      >
        <LoginForm onSubmit={handleLogin} />
      </TempModal>
    </div>
  )
}

export default App
