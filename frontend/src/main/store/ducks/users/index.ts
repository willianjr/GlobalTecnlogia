import { Reducer } from 'redux'
import Crud from '../../../../common/components/crud';


import {UsersState, UsersTypes} from './types'

const INITIAL_STATE:UsersState = {
	loading:null,
	error:false,
	data: {
		list:[],
		user:{
			_id:'',
			name:'',
			email:'',
			senha:'',
			nivel:'',
			createdAt:''
		}
	},
	crud:{
		totalRegister:0,
		registerPerPage:10,
		atualPage:1,
		sort:'',
		filters:{}
	}

}

const reducer:Reducer<UsersState> = (state = INITIAL_STATE,action)=>{
	//console.log(action)
	switch (action.type) {
		case UsersTypes.SAVE:
			console.log("SAVE redux")
      return { ...state,
					loading: true };
		case UsersTypes.SAVE_SUCCESS:
			console.log("SAVE success")
			//history.push("/Papel")
			return { ...state,
					loading: false };
		case UsersTypes.GETALL:
			//console.log("serach redux")
      return { ...state,
					loading: true };
		case UsersTypes.GETALL_SUCCESS:
			//console.log(action.payload.data)
			return{ ...state,
				loading: false,
				error:false,
				data: {...state.data,
						list:action.payload.data.list},
				crud:{...state.crud,
					totalRegister:action.payload.data.totalRegister}
				}
		case UsersTypes.GETID:
			//console.log("GETID")
      return { ...state, loading: true};
		case UsersTypes.GETID_SUCCESS:
			return{
				...state,
				loading: false,
				error:false,
				data:{
					user:action.payload.data.list,
					list:[]
				},
				crud:{...state.crud,
					totalRegister:action.payload.data.totalRegister
				}

				}
		case UsersTypes.DELETE:
			//console.log("delete")
				return { ...state, loading: true }
		case UsersTypes.DELETE_SUCCESS:
				//console.log("delete")
					return { ...state, loading: false }
		case UsersTypes.ERROR:
			console.log(action.payload)
			return{
				...state,
				loading: false,
				error:true
					}
		default:
			//console.log(state)
			return state

	}

}

export default reducer
