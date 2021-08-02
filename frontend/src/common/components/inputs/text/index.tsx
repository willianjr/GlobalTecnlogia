import { ReactNode, useEffect, useState} from 'react'
import { FieldError } from 'react-hook-form';

import '../index.scss'

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined
	| any;

 interface IProps{
	label?:string
	name?:any
	register?:RefReturn
	placeholder?:string
	readOnly?:boolean
	type:string
	errors?: FieldError | undefined
	edit?:boolean
	onChange?:(e:HTMLInputElement)=>void


}

 const TextBox:React.FC<IProps>=({name, label, register=()=>{}, placeholder, readOnly, type, errors, edit, onChange})=>{

	const initFocus = (placeholder && placeholder !== label) || edit ? true : false
 	const [focus, setFocus] = useState(true)

	 return(
    <div className='form-group groupInput'>
        {label &&
        	<label htmlFor={name} className={`${focus && 'focus'}`}>
							{label}
					</label>
				}
				{errors &&
				<span className='messageError'>{errors?.message}</span>}
        <input
						{...register(name)}
						className={`form-control ${errors && 'error'}`}
            placeholder={placeholder || label}
            readOnly={readOnly}
            type={type}
						name={name}
						id={name}
						onChange={onChange}

        />


    </div>
	)}

export default TextBox

