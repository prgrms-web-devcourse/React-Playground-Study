import React, { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    /** 여기에 로그인 처리 로직
    예: API 호출, 상태 업데이트 등
    로그인이 성공하면 onSubmit을 호출하여 모달을 닫을 수 있다. */
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label>Email</label>
        <input
          type='email'
          value={email}
          placeholder='이메일을 입력하세요'
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
      <section>
        <label>Password</label>
        <input
          type='password'
          value={password}
          placeholder='비밀번호를 입력하세요'
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <button type='submit'>Sign In</button>
    </form>
  )
}

export default LoginForm
