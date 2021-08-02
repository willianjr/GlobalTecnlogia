import {ReactNode} from 'react'
import './index.scss'
declare interface IProps {
	children?:ReactNode,
	header?:string,
	headerIcon?:string
}

export default (props:IProps) => (
    <section className='card'>
				<div className='card-header'>
				<i className={'fa fa-'+ props.headerIcon}/>
				{props.header}
        </div>
         <div className='card-body'>
            {props.children}
        </div>
    </section>
)
