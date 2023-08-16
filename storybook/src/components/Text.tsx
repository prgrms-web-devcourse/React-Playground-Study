import React from 'react'

// 요런 식으로 작성하면 되나 ..?!
interface TextProps {
  children: JSX.Element
  size: number
  strong: boolean
  [other: string]: any
}

// 이 React.FC는 뭐지 ..? 매개변수에 타입 적용해주면 안되나? ㅠㅠ
const Text: React.FC<TextProps> = ({ children, size, strong, ...props }) => {
  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: size,
  }

  return <div style={{ ...props.style, ...fontStyle }}>{children}</div>
}

export default Text
