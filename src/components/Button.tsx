import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

// NOTE By extending ButtonHTMLAttributes<HTMLButtonElement>, you're already inheriting properties like onClick, className, and type. This means there's no need to redefine them unless you want to provide default values or modify their behavior.
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({
  // NOTE Setting a default value for className to an empty string (className = '') is a good practice. It ensures that the className is always a string and avoids potential issues.
  className = '',
  onClick,
  type = 'button',
  children,
  ...props // Pass down any additional props
}: IButtonProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
