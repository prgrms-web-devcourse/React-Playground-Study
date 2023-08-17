import { PropsWithChildren } from 'react'

type ButtonProps = {
  onClick?: () => void
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

export default Button
