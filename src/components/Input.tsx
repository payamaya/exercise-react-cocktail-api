import { ReactElement } from 'react'
import { IInput } from '../interfaces'
// interface IInputProps extends IInput {
//   className: string
// }
export function Input({ label, className, ...input }: IInput): ReactElement {
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
