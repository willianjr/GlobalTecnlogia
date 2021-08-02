import React from 'react';
import '../index.scss'

declare interface IProps {
	label?:String,
	name?:any,
	input:any,
	value:String


}

export default (props:IProps) => (
    <div className='form-group form-view'>
        {props.label &&
       	 	<label htmlFor={props.name}>{props.label}</label>
				}
        <input {...props.input}
							className='form-control'
							readOnly='true'
							value={props.value}
        />
    </div>
)

