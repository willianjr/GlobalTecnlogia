import React, { ReactNode } from 'react';
import './index.scss'

// import { Container } from './styles';
declare interface IProps {
	children?:ReactNode,
	msg:string,
	loading:boolean|null,
	icon:string
}

export default (props:IProps) =>(
		<>
			{props.loading &&
				<div className="loadingContent">
					<i className={`fa fa-${props.icon} fa-spin fa-1x fa-fw`}></i>
					<span>{props.msg}</span>
					</div>
			}
		</>
)
