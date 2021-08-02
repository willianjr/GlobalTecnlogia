import {action} from 'typesafe-actions'
import {UsersTypes, Data, Crud, User} from './types'

export const userError = (error:string) => action(UsersTypes.ERROR, error)

export const userGetAll = (filter?:Crud) =>  action(UsersTypes.GETALL, filter)
export const userGetAllSucess = (data: Data) => action(UsersTypes.GETALL_SUCCESS,{data})

export const userGetId = (id:string) => action(UsersTypes.GETID, id)
export const userGetIdSucess = (data: Data) => action(UsersTypes.GETID_SUCCESS,{data})

export const userDelete = (id:string,filter?:Crud) => action(UsersTypes.DELETE,{id,filter});
export const userDeleteSuccess = (data: Data) => action(UsersTypes.DELETE_SUCCESS,{data});

export const userSave = (user:any, history:any) => action(UsersTypes.SAVE, {user, history});
export const userSaveSuccess = (user:any) => action(UsersTypes.SAVE_SUCCESS, {user});


export const userSort = (sort:string,filter?:Crud) => action(UsersTypes.SORT,{sort,filter});


export const userFilter = (filters:object,filter?:Crud) => action(UsersTypes.FILTER,{filters,filter});
