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
		setIsLogado(auth.isAuthenticated())
		const {nome,email} = auth.getUser()
		setNomeUser(nome)
		setEmailUser(email)
	},[])

	useEffect(() => {
			registerDados(authState.auth)
	}, [authState])



	const registerDados = (data:any)=>{

		setIsLogado(auth.isAuthenticated())
		const {nome,email} = auth.getUser()
		setNomeUser(data.name||data.nome||nome)
		setEmailUser(data.email||email)


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
