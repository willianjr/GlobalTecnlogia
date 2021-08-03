import api from '../../main/services/api'
import {LoginForms} from '../../main/store/ducks/users/types'
import {Auth} from '../../main/store/ducks/auth/types'
import {toastr} from 'react-redux-toastr'
import { ApplicationState } from '../store'
import { authLogout } from '../store/ducks/auth/actions'



interface Iauth {
	efetuarLogin:({email,senha}:LoginForms)=>void,
	getToken:()=>string,
	isAuthenticated:()=> boolean,
	efetuarLogout:()=>void,
	getUser:()=>{
			nome:string,
			email:string,
			nivel:string}
}

const KeyToken = 'TOKEN_KEY_WRJ'
const KeyUser = 'USER_KEY_WRJ'


const efetuarLogin = ({email,senha:password}:LoginForms) =>{

	api.post("auth",{email,password})
		.then((response) => {
			const {token, user:{email,nivel,nome}} = response.data
			//registrarLogin(email,nivel,nome,token)
			toastr.success("Login",`Seja bem vindo: ${nome}`)
		})
		.catch((error) => {
			if (error.response) {

				toastr.error("Ocorreu um erro",error.response.data.message)

			} else if (error.request) {
				toastr.error("Ocorreu um erro",error.request)

			} else {
				// Something happened in setting up the request that triggered an Error
				toastr.error("Ocorreu um erro",error.message)
			}

		});
}


const registrarLogin = (data:Auth) => new Promise((resolve, reject) =>{


	const {token,email,nivel,name} = data

	localStorage.setItem(KeyToken, token);
	localStorage.setItem(KeyUser, JSON.stringify({email,nivel,nome:name}));
	console.log("registrar",JSON.stringify({email,nivel,name}))
	resolve(true)


})

const efetuarLogout = () => new Promise((resolve, reject) =>{

	localStorage.removeItem(KeyToken)
	localStorage.removeItem(KeyUser)
	console.log('logout auth')
	resolve(true)

})


	const getToken = ()=> localStorage.getItem(KeyToken)
	const isAuthenticated = () => {



		if(localStorage.getItem(KeyToken) !== null)
		{
			api.get(`auth/${localStorage.getItem(KeyToken)}`)
			.then((response) => {
				console.log(response)
				return true

			})
			.catch((error) => {
				localStorage.removeItem(KeyToken)
				return false
		})
		}
		else
		{
			localStorage.removeItem(KeyToken)
			localStorage.removeItem(KeyUser)
			return false
		}

		return true


	}
	const getUser = ()=> {


				const ExistKeyUser = localStorage.getItem(KeyUser) !== null
				const getNivelNumber = (nivel:string) => {
					switch (nivel) {
						case 'admin': return 100
						case 'usr' : return 1
						default : return 0
					}
				}
				if(ExistKeyUser)
				{
					const LocalUser = JSON.parse(localStorage.getItem(KeyUser)||"")
					return {...LocalUser, nivel:getNivelNumber(LocalUser.nivel)}
				}
				else{
					//console.log("Matar Sesssão")
					return {
						nome:'',
						email:'',
						nivel:''
					}
				}




		}

export default {
	efetuarLogin,
	getToken,
	isAuthenticated,
	efetuarLogout,
	getUser,
	registrarLogin
}
