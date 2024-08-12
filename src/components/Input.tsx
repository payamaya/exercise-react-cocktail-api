import { ChangeEventHandler, ReactElement } from 'react'

interface IInputProps {
  label?: string
  placeholder?: string
  type: 'text' | 'search'
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value?: string
  name?: string
  id?: string
  checked?: boolean
  className?: string
}

export function Input(props: IInputProps): ReactElement {
  return (
    <input
      className='input'
      id={props.label}
      onChange={props.onChange}
      type={props.type}
      value={props.value}
      checked={props.checked}
    />
  )
}
