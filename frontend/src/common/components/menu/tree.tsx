import {ReactNode} from 'react'
import { Link } from 'react-router-dom'

declare interface IProps {
	children:ReactNode,
	path?:any,
	icon:String,
	label:String
}

export default (props:IProps) => (
    <li className='nav-item has-treeview'>
        <Link className='nav-link ' to={props.path}>
            <i className={`nav-icon fa fa-${props.icon}`}></i> <span>{props.label}</span>
            <i className='right fa fa-angle-left'></i>
        </Link>
        <ul className='nav nav-treeview'>
            {props.children}
        </ul>
    </li>
)
