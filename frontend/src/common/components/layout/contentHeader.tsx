import {ReactNode} from 'react'
import Breadcrumb from '../breadcrumb'
import './index.scss'
import IBreadCrumbPages from '../../interfaces/breadcrumbpages'

declare interface IProps {
	children?:ReactNode,
	title:String,
	small:String,
	breadcrumbPages:IBreadCrumbPages[]
}

export default  (props:IProps) =>(
        <>
            <Breadcrumb pages={props.breadcrumbPages}/>
						{(props.title||props.small) &&
                <section className='content-header'>
                    <h1>{props.title} <small>{props.small}</small></h1>
                </section>

						}


        </>
    )
