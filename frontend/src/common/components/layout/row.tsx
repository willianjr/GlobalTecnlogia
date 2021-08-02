import {ReactNode} from 'react'

declare interface IProps {
	children:ReactNode,
	className?:string
}


export default (props:IProps) => (
    <div className={`row ${props.className}`}>{props.children}</div>
)
