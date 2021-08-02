import React from 'react'
import Menu from '../menu/'
import  './index.scss'


interface IProps{
	isLogado?:boolean,
	nomeUser?:string,
	emailUser?:string
}


export default (props:IProps)=>(
	<aside className="main-sidebar sidebar-dark-primary elevation-4">
		<section className="sidebar">
			{props.isLogado && (<>
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
						<div className="info">
								<a href="#" className="d-block">{props.nomeUser}</a>
								<small className="font-light">{props.emailUser}</small>
						</div>
				</div>
				</>)
				}
				<Menu isAuthenticated={props.isLogado}/>
			</section>
	</aside>

)

