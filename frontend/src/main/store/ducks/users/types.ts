/** ACTION TYPES */
export enum  UsersTypes {
	GETALL   =  '@users/SEARCH',
	GETALL_SUCCESS  =  '@users/SEARCH_SUCCESS',
	GETID   =  '@users/GETID',
	GETID_SUCCESS  =  '@users/GETID_SUCCESS',
	SAVE   =  '@users/SAVE',
	SAVE_SUCCESS   =  '@users/SAVE_SUCCESS',
	DELETE   =  '@users/DELETE',
	DELETE_SUCCESS   =  '@users/DELETE_SUCCESS',
	ERROR ='@users/ERROR',
	SORT ='@users/SORT',
	FILTER ='@users/FILTER',

}

export interface User{
	_id:string,
  name:string,
	email:string,
	nivel:string,
	senha:string,
	createdAt:string
}

export interface UserForms extends Omit<User,'_id'|'createdAt'> {}
export interface LoginForms extends Omit<User,'_id'|'createdAt'|'name'|'nivel'> {}


/** DATA TYPES */
export interface Data {
	list:User[],
	user:User
}

export interface Crud {
	totalRegister:number,
	registerPerPage:number,
	atualPage:number,
	sort:string,
	filters:object
}
export interface UsersState {
	readonly data:Data
	readonly crud:Crud
	readonly loading: boolean|null
	readonly error: boolean
}
