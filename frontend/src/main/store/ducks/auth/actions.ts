import {action} from 'typesafe-actions'
import {AuthTypes, Data, Auth,LoginForms} from '../auth/types'

//export const userError = (error:string) => action(UsersTypes.ERROR, error)

export const authLogin = (data:LoginForms,history:any) =>  action(AuthTypes.LOGIN, {data,history})
export const authLoginSuccess = (data:Auth) =>  action(AuthTypes.LOGIN_SUCCESS, {data})
export const authLogout = () => action(AuthTypes.LOGOUT, {})
export const authLogoutSuccess = () => action(AuthTypes.LOGOUT_SUCCESS, {})
export const authError = () => action(AuthTypes.ERROR,{})



