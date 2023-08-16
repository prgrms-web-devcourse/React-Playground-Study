import React from 'react'

// 강의에서는 js 형식으로 만들어주길래 ts로 만들었더니 에러가 ..? 이유가 뭐지 ?!
const Box = ({ width = 100, height = 100, backgroundColor = 'red' }) => {
  const style = {
    width,
    height,
    backgroundColor,
  }
  return <div style={style} />
}

export default Box
