import {
  ButtonHTMLAttributes,
  // MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // className: string
  // onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  // type?: 'submit' | 'button'
}

export function Button({
  className = '',
  onClick,
  type = 'button',
  children,
}: IButtonProps): ReactElement {
  return (
    <button onClick={onClick} className={`btn ${className}`} type={type}>
      {children}
    </button>
  )
}
