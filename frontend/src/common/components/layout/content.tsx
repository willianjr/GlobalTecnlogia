import {ReactNode} from 'react'
import './index.scss'
declare interface IProps {
	children?:ReactNode,
}

export default (props:IProps) => (
    <section className={'content'}>
         <div>
            {props.children}
        </div>
    </section>
)
