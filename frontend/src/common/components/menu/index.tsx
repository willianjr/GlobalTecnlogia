import React, { useEffect, useState } from 'react'
import MenuItem from './item'

interface IProps{
	isAuthenticated?:boolean
}

export default (props:IProps)=>
(
    <nav className="mt-2 ">

				 <ul className="nav nav-pills nav-sidebar flex-column nav-legacy nav-compact nav-child-indent text-sm" data-widget="treeview" role="menu">

						<MenuItem hide={props.isAuthenticated} path="/Login" icon="sign-in" label="Login"/>
						<MenuItem hide={!props.isAuthenticated} path="/Logout" icon="sign-out" label="Logout"/>
						<MenuItem hide={!props.isAuthenticated} path="/" icon="dashboard" label="Inicial"/>
						<MenuItem hide={!props.isAuthenticated} path="/Usuarios" icon="users" label="Usuários"/>

        </ul>

    </nav>

)
