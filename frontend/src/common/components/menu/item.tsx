import {ReactNode} from 'react'
import { Link,NavLink  } from 'react-router-dom'

declare interface IProps {
	children?:ReactNode,
	path?:any,
	icon:string,
	label:string,
	hide?:boolean,
}


export default (props:IProps) => (
		<>
		{!props.hide && (
		<li className='nav-item'>
        <NavLink to={props.path} className="nav-link">
            <i className={`nav-icon fa fa-${props.icon}`}></i>
            <span>{props.label}</span>
        </NavLink>
    </li>
		)
		}
	</>
)
