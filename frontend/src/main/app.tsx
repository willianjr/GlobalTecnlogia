import React, { useEffect, useState } from 'react'
import {Routes} from '../main/routes'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import auth from '../main/services/auth'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../main/store'
import '../common/dependences'


import Header from '../common/components/layout/header'
import Footer from '../common/components/layout/footer'
import Sidebar from '../common/components/layout/sidebar'
import Toastr from '../common/components/toastr'

export default function APP (){

	const [isLogado,setIsLogado] = useState(false)
	const [nomeUser,setNomeUser] = useState('')
	const [emailUser,setEmailUser] = useState('')

	const authState:any = useSelector<ApplicationState>(state => state.auth)

	useEffect(() => {
		if(auth.isAuthenticated()){
			console.log(isLogado,auth.getToken())
			setIsLogado(true)
			console.log(isLogado,auth.getToken())
		}
	})

	useEffect(() => {
		console.log("APP: auth",authState)
		if(authState.auth.token)
		{
			registerDados(authState.auth)
		}
		else{

			setIsLogado(auth.isAuthenticated())
			registerDados(auth.getUser())
		}

	}, [authState])
	const registerDados = (data:any)=>{

		setNomeUser(data.name||data.nome)
		setEmailUser(data.email)

	}
    return(
			<>
			<HashRouter>
					<Header/>
					<Sidebar isLogado={isLogado} nomeUser={nomeUser} emailUser={emailUser} />
		        <div className="wrapper">
					<div className="content-wrapper">
						<Routes isLogado={isLogado}/>
					</div>
				</div>
				<Footer/>
				<Toastr/>
				</HashRouter>
			</>
    )
}
