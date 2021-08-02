import React from 'react';
import '../index.scss'

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

declare interface IProps{
	label?:string,
	name?:any,
	register?:RefReturn,
	placeholder?:string,
	readOnly?:boolean,
	className?:string
}


const CheckBox:React.FC<IProps>=({name, label, register, placeholder, readOnly, className})=>{
    return (<div className='form-group check'>
        {label &&
        	<label htmlFor={name}>{label}</label>
				}
        <br/>
        <input
						ref={register}
						className={`custom-control-checkbox ${className}`}
            placeholder={placeholder}
            readOnly={readOnly}
            type="checkbox"
        />
				</div>)
}
export default CheckBox

