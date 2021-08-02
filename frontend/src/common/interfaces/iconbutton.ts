import {ReactNode} from 'react'

export default interface IIconButton {
	children?:ReactNode,
	style?:string,
	type?:any,
	hide?:boolean,
	disabled?:any,
	title?:any,
	icon:string,
	onClick?:()=>void,
}
