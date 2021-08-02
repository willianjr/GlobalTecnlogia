import { AxiosResponse } from "axios";
import { call, put} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'


import api from '../../../services/api'


import {userError,userGetAllSucess, userGetIdSucess, userGetAll, userSaveSuccess, userDeleteSuccess} from './actions'

import { isPropertySignature } from "typescript";


export function* getAll(action:any)
{
	try{
		//console.log("sagas search")
		const {atualPage=1, registerPerPage=10, sort='', filters={}} = action.payload || {}
		//console.log("getall",action.payload)
		const paginationQuery =`page=${atualPage-1}&limit=${registerPerPage}`
    const sortQuery = sort && `&sort=${sort}`
    const filterQuery = filters && `&filter=${JSON.stringify(filters)}`
		const response:AxiosResponse = yield call(api.get,`user?${paginationQuery}${sortQuery}${filterQuery}`)
		if(response.status===200)
		{
			yield put(userGetAllSucess(response.data))
		}

	}
	catch(err)
	{
		yield put(userError(err))
	}
}
export function* getId(action:any)
{
	try{
		//console.log(`paylaod:${action.payload}`)
		const {payload:id} = action
		const response:AxiosResponse = yield call(api.get,`user/${id}`)

		if(response.status===200)
		{
			console.log("GETid",response)
			yield put(userGetIdSucess(response.data))
		}
		else{
			//console.log("GETid Error",response)
			yield put(userError(''))
		}

	}
	catch(err)
	{
		//console.log("GET Error")
		yield put(userError(err))
	}
}
export function* deleteId(action:any)
{
	try{

		const atualPageFN = ():number =>{
					return Math.ceil(totalRegister/registerPerPage)>1 ? (atualPage*registerPerPage >= totalRegister ? atualPage-1 : atualPage) : 1
		}
		const {id,filter,history} = action.payload
		const response:AxiosResponse = yield call(api.delete,`user/${id}`)
		//const response:AxiosResponse = yield call(api.get,`user/${id}`)
		const {atualPage,registerPerPage,totalRegister} = filter
		const filterOk = {...filter,atualPage:atualPageFN()}

		if(response.status===200)
		{
			//console.log("DELETEid",response)
			//setTimeout((history)=>history.push("/Usuarios"),500)
			yield put(userGetAll())
			yield put(userDeleteSuccess(response.data.user))
			toastr.success("Sucesso!","Usuário removido com sucesso.")

		}
		else{
			//console.log("GETid Error",response)
			yield put(userError(''))
		}

	}
	catch(err)
	{
		//console.log("GET Error")
		yield put(userError(err))
	}
}
export function* save(action:any)
{
	try{
		const {user, history} = action.payload
		//console.log("sagas save",JSON.stringify(user))

		const userSave = {...user,passwordHash:user.senha}
		delete userSave.senha
		//console.log(userSave)
		const method = userSave._id ? 'put' : 'post'
		const response:AxiosResponse = yield call(api[method],`user${method==='put'?'/'+userSave._id:''}`,userSave)
		if(response.status===201)
		{
			//console.log(response)
			yield put(userSaveSuccess(response.data.user))
			history.push("/Usuarios")
			toastr.success("Sucesso!",`Usuário ${method==='put'?'alterado':'salvo'} com sucesso.`)

		}

	}
	catch(e)
	{
		yield put(userError(e))
		toastr.error("Ocorreu um erro",e.message)
		console.warn("error",e)
		//e.response.data.errors.forEach((erro:string)=>toastr.error("Erro",erro))

	}
}

export function* changePage(action:any)
{
	try{
		const {page,filter} = action.payload
		yield put(userGetAll(filter))
	}
	catch(err)
	{
		console.log("GET Error")
		yield put(userError(err))
	}
}

