import { title } from '../types'

// 오~ 무조건 props를 객체로 받아야 쓸 수 있구나! 이럴 때마다 타입을 계속 지정해줘야 하는 건가? 그럼 props 사용할 컴포넌트는 전부 타입을 따로 선언해와서 적용해야 하는 것인가 ?!
export default function Title({ text, fontSize, fontColor }: title) {
  return (
    <>
      <h1 style={{ fontSize, color: fontColor }}>{text}</h1>
    </>
  )
}
