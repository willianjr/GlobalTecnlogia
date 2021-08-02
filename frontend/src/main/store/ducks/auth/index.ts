import { Reducer } from 'redux'


import {AuthState, AuthTypes} from '../auth/types'

const INITIAL_STATE:AuthState = {
	loading:null,
	error:false,
	auth:{
		name:'',
		email:'',
		nivel:'',
		token:''
	}

}

const reducer:Reducer<AuthState> = (state = INITIAL_STATE,action)=>{
	//console.log(action)
	switch (action.type) {
		case AuthTypes.LOGIN:
			console.log("login reduce")
			return { ...state,
					loading: true };
				break
		case AuthTypes.LOGIN_SUCCESS:
			console.log("loginsucces reduce")
			const {token,user:{email,nivel,nome}} = action.payload.data
			return { ...state,
				loading: false,
				auth:{
						name:nome,
						email,
						nivel,
						token
				}
			}

		case AuthTypes.LOGOUT:
			console.log("logout reduce")
			return { ...state,
					loading: true,
					auth:{
						name:'',
						email:'',
						nivel:'',
						token:''
					} }

		case AuthTypes.LOGOUT_SUCCESS:
			console.log("logoutsucess reduce")
			return { ...state,
					loading: false }

		case AuthTypes.ERROR:
			return { ...state,
					loading: false,
					error: true }

		default:
			//console.log(state)
			return state

	}

}

export default reducer
