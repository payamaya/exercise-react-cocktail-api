import { ReactElement } from 'react'
import { IInput } from '../interfaces'
interface IInputProps extends IInput {
  className: string
}
export function Input({
  label,
  className,
  ...input
}: IInputProps): ReactElement {
  return (
    <input
      className={`input ${className}`}
      id={label}
      onChange={input.onChange}
      type={input.type}
      value={input.value}
      checked={input.checked}
    />
  )
}
