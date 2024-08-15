import { ReactElement, InputHTMLAttributes } from 'react'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string // Optional label for accessibility
}

export function Input({
  label,
  className = '',
  ...input
}: IInput): ReactElement {
  return (
    <input
      className={`input ${className}`}
      id={input.id || label} // Use id if provided, otherwise fall back to label
      onChange={input.onChange}
      type={input.type}
      value={input.value}
      checked={input.checked}
      placeholder={input.placeholder}
      name={input.name}
    />
  )
}
