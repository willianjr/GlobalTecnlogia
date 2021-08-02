import React, {ReactNode, Component, useState} from 'react'
import { FieldError } from 'react-hook-form';

import '../index.scss'

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined
	| any;


declare interface IOptions{
	key:any,
	label:String,
	value:any
}
declare interface IProps {
	children:ReactNode,
	label?:string,
	name?:any,
	placeholder?:string,
	register?:RefReturn,
	errors: FieldError | undefined
	edit?:boolean



}


 const Select:React.FC<IProps>=({label, name,placeholder,register,errors,children,edit})=>{

	const initFocus = (placeholder && placeholder !== label) || edit ? true : false
 	const [focus, setFocus] = useState(true)

	return (
			<div className='form-group groupInput'>
					{label &&
						<label htmlFor={name} className={`${focus && 'focus'}`}>
								{label}
						</label>
					}
					{errors &&
					<span className='messageError'>{errors?.message}</span>}
					<select
							{...register(name)}
							className='form-control'
							placeholder={placeholder || label}



							>
							<option value=''>{placeholder || label}</option>
							{children}
					</select>
			</div>
	)
}

export default Select
