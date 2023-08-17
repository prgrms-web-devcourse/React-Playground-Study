import { PropsWithChildren } from 'react'

type ButtonProps = {
  onClick?: () => void
  className?: string
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
