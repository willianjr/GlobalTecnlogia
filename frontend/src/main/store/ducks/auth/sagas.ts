import { AxiosResponse } from "axios";
import { call, put} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'


import api from '../../../services/api'
import auth from '../../../services/auth'


import {authLoginSuccess, authError, authLogoutSuccess} from './actions'
import { isPropertySignature } from "typescript";


export function* login(action:any)
{
	try{
		const {data, history} = action.payload
		const authConst = {...data,password:data.senha}
		const response:AxiosResponse = yield call(api.post,'auth',authConst)
		if(response.status===200)
		{

			yield put(authLoginSuccess(response.data))

			const {token, user:{email,nivel,nome}} = response.data
			yield auth.registrarLogin({token,email,nivel,name:nome})
			//history.push("/")
			toastr.success("Login",`Seja bem vindo!!: ${nome}`)
		}

	}
	catch(e)
	{
		yield put(authError())
		if (e.response) {
			toastr.error("Ocorreu um erro",e.response.data.message)
		} else if (e.request) {
			toastr.error("Ocorreu um erro",e.request)
		} else {
			// Something happened in setting up the request that triggered an Error
			toastr.error("Ocorreu um erro",e.message)
		}
		//e.response.data.errors.forEach((erro:string)=>toastr.error("Erro",erro))

	}
}
export function* logout(action:any)
{
	try{

		yield put(authLogoutSuccess())
		yield auth.efetuarLogout()

	}
	catch(e)
	{
		yield put(authError())
		if (e.response) {
			toastr.error("Ocorreu um erro",e.response.data.message)
		} else if (e.request) {
			toastr.error("Ocorreu um erro",e.request)
		} else {
			// Something happened in setting up the request that triggered an Error
			toastr.error("Ocorreu um erro",e.message)
		}
		//e.response.data.errors.forEach((erro:string)=>toastr.error("Erro",erro))

	}
}


