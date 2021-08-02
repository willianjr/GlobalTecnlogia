import React, { Component, ReactNode } from 'react'
import If from '../operator/if';
import IBreadCrumbPages from '../../interfaces/breadcrumbpages'

import './index.scss';

declare interface IProps{
	children?:ReactNode,
	pages:IBreadCrumbPages[]
}


export default class breadcrumb extends Component<IProps> {
   constructor(props:IProps){
       super(props)
   }
   render(){
    const renderPages = () =>{
        const listPages = this.props.pages|| []
        return listPages.map(data=>(
            <li key={data.page} className={`breadcrumb-item ${data.active?'active':''}`}>
                {data.active === true ?
                 	<span>{data.page}</span>
									:
                	<a href={`#${data.link}`}>{data.page}</a>
								}
            </li>
            )
        )
    }
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/#">Home</a></li>
                {renderPages()}
            </ol>
        </nav>
  )}
}
