import React from 'react'

const Box = ({ width = 100, height = 100, backgroundColor = 'red' }) => {
  const style = {
    width,
    height,
    backgroundColor,
  }
  return <div style={style} />
}

export default Box
