import React,{useEffect, useState} from "react"
import {Redirect, useParams} from "react-router-dom"
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup'
import {toastr} from 'react-redux-toastr'
import api from '../main/services/api'
import auth from '../main/services/auth'

import {LoginForms} from '../main/store/ducks/users/types'
import {ApplicationState} from '../main/store'
import {Auth, Data} from '../main/store/ducks/auth/types'
import {authLogin}  from '../main/store/ducks/auth/actions'
import Schemas from '../main/store/ducks/users/schemas'

import ContentHeader from '../common/components/layout/contentHeader'
import Content from '../common/components/layout/content'
import Loading from '../common/components/loading'
import Row from '../common/components/layout/row'
import Grid from '../common/components/layout/grid'
import IconButton from '../common/components/iconButton'
import Input from '../common/components/inputs'


interface StateProps{
	loading:boolean
}
interface DispatchProps{
	authLogin(data:object):void

}
interface OwnProps{
	history:any,

}
type Props = OwnProps & StateProps & DispatchProps

export default function LoginForm (props:Props) {

	const { register, setValue, handleSubmit, formState: {isDirty, isSubmitting, errors }, reset} = useForm<LoginForms>({
		resolver: yupResolver(Schemas.schemaLogin),
		defaultValues:{
			email:'',
			senha:''
		}
	});


	const dispatch = useDispatch()
	const onSubmit = handleSubmit((data:LoginForms) => { dispatch(authLogin(data, props.history))})

	const currentState:any = useSelector<ApplicationState>(state => state.auth)
	const loading:any = useSelector<ApplicationState>(state => state.auth.loading)

	const titlePage = 'Login'
	const subtitlePage = 'Preencha os dados para efetuar login'

	const [isLogado,setIsLogado] = useState(false)
	useEffect(() => {
		if(auth.isAuthenticated()){
			setIsLogado(true)
		}
	})

	useEffect(() => {
		if(currentState.auth.token)
		{
			//console.log("LOGIN Auth: ",currentState.auth)
			//setIsLogado(true)

		}
		else{

			//setIsLogado(auth.isAuthenticated())
		}
}, [currentState])

  return (
    <div>
        <ContentHeader
					title={titlePage}
					small={subtitlePage}
					breadcrumbPages={[{page:'Login',link:'/Login',active:false}]}
				/>

			<Loading msg="Carregando" loading={loading} icon="refresh"/>
			{!isLogado ? (
			<Content>
					<form onSubmit={onSubmit} className="formRegister">
						<Row>
							<Grid cols='12 6 4' >
								<Input.TextBox  name="email" type="email" label="Email" register={register} errors={errors.email} />

							</Grid>
							<Grid cols='12 6 4' >
								<Input.Password  name="senha" label="Senha" register={register} errors={errors.senha} />

							</Grid>
							<Grid cols='12 6 4'>
								<IconButton disabled={!isDirty || isSubmitting}  type="submit" icon="sign-in" style="primary">Fazer Login</IconButton>
							</Grid>
						</Row>

					</form>
			</Content>
			):(
				<>
				<h1>redirecionar</h1>
					<Redirect push  to={{ pathname: "/" }} />
				</>
			)}

    </div>
  )
}
