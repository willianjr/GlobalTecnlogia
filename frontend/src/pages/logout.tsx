import React,{useEffect, useState} from "react"
import auth from '../main/services/auth'
import ContentHeader from '../common/components/layout/contentHeader'
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authLogout } from "../main/store/ducks/auth/actions"
import { ApplicationState } from "../main/store"
import Loading from '../common/components/loading'



interface StateProps{
	loading:boolean
}
interface DispatchProps{
	authLogout(data:object):void

}
interface OwnProps{
	history:any,

}
type Props = OwnProps & StateProps & DispatchProps

export default function LogoutForm (props:Props) {
	const dispatch = useDispatch()
	const [isLogout,setIsLogout] = useState(false)

	const currentState:any = useSelector<ApplicationState>(state => state.auth)
	const loading:any = useSelector<ApplicationState>(state => state.auth.loading)

	useEffect(() => {
		dispatch(authLogout())

	}, [])
	useEffect(() => {
	if(!currentState.auth.token)
	{

		setIsLogout(true)

	}
	}, [currentState])
	const titlePage = 'Logout'
	const subtitlePage = 'Efetuando Logout'
  return (
    <div>
        <ContentHeader
					title={titlePage}
					small={subtitlePage}
					breadcrumbPages={[{page:'Logout',link:'/Logout',active:false}]}
				/>
			<Loading msg="Carregando" loading={loading} icon="refresh"/>
			{isLogout ? (

				<Redirect to={{ pathname: "/Login", state: { currentState } }} />
			):(
				<h1>ok</h1>
			)}
    </div>
  )
}
