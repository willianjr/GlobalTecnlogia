/** ACTION TYPES */
export enum  AuthTypes {
	LOGIN   =  '@auth/LOGIN',
	LOGIN_SUCCESS   =  '@auth/LOGIN_SUCCESS',
	LOGOUT  =  '@auth/LOGOUT',
	LOGOUT_SUCCESS  =  '@auth/LOGOUT_SUCCESS',
	ERROR  =  '@auth/ERROR'
}

export interface Auth{
	name:string,
	email:string,
	nivel:string,
	token:string
}

export interface LoginForms extends Omit<Auth,'name'|'token'|'nivel'> {}

/** DATA TYPES */
export interface Data {
	auth:Auth
}

export interface AuthState {
	readonly auth:Auth
	readonly loading: boolean|null
	readonly error: boolean
}
