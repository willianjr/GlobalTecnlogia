import IRoute from "../interfaces/route"

import Erro404 from '../../pages/erro404'
import LoginPage from '../../pages/login'
import LogoutPage from '../../pages/logout'
import HomePage from '../../pages/home'

//USER
import UsuariosIndex from '../../pages/users'
import UsuariosForm from '../../pages/users/form'

import auth from '../../main/services/auth'


const routes: IRoute[] =[
	{
			path:'/',
			name:'Home',
			component:HomePage,
			exact:true,
			auth:true
	},
	{
		path:'/Login',
		name:'Login',
		component:LoginPage,
		exact:true
	},
	{
		path:'/Logout',
		name:'Logout',
		component:LogoutPage,
		exact:true
	},
	{
			path:'/Usuarios',
			name:'Usuarios',
			component:UsuariosIndex,
			exact:true,
			auth:true,
			level:10
		},
		{
			path:'/Usuarios/Novo',
			name:'Cadastro de Usuários',
			component:UsuariosForm,
			exact:true,
			auth:true,
			level:9
		},
		{
			path:'/Usuarios/Editar/:id',
			name:'Edição de Usuários',
			component:UsuariosForm,
			exact:true,
			auth:true,
			level:10
		},
		{
			path:'*',
			name:'Error',
			component:Erro404,
			exact:true

		}
]

export default routes
