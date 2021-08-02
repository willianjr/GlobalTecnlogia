import React,{useEffect, useState} from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {useParams} from "react-router-dom"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {userGetId, userSave}  from '../../main/store/ducks/users/actions'

import {UserForms, User, UsersState} from '../../main/store/ducks/users/types'
import {ApplicationState} from '../../main/store'
import Schemas from '../../main/store/ducks/users/schemas'

import ContentHeader from '../../common/components/layout/contentHeader'
import Content from '../../common/components/layout/content'
import Loading from '../../common/components/loading'
import Row from '../../common/components/layout/row'
import Grid from '../../common/components/layout/grid'
import IconButton from '../../common/components/iconButton'
import Input from '../../common/components/inputs'


interface StateProps{
	loading:boolean
}
interface DispatchProps{
	userGetId(id:number):void
	userSave(data:object):void
}
interface OwnProps{
	history:any,

}
type Props = OwnProps & StateProps & DispatchProps

export default function UserForm (props:Props) {
  const { register, setValue, handleSubmit, formState: {isDirty, isSubmitting, errors }, reset} = useForm<UserForms>({
		resolver: yupResolver(Schemas.schemaNew),
		defaultValues:{
			name:'',
			email:'',
			nivel:'',
			senha:''
		}
	});
  const onSubmit = handleSubmit((data:UserForms) => { dispatch(userSave(data, props.history))})

	const {id} = useParams<{id:string}>()

	const dispatch = useDispatch()
	const currentState:any = useSelector<ApplicationState>(state => state.users)
	const loading:any = useSelector<ApplicationState>(state => state.users.loading)

	const titlePage = id ? `Edição Usuario:${currentState.data.user?.initial||""}` : 'Novo Usuario'
	const subtitlePage = id ? 'Edição dos dados do usuário' : 'Preencha os dados para o cadastro de um novo Usuário'

	useEffect(() => {
		if(id)
		{
			dispatch(userGetId(id))
			//setloadingFinish(false)
		}
		else{

			reset()
		}
	}, [])
	useEffect(() => {
		if(loading===false && id)
		{
			if(currentState.crud.totalRegister>0)
			{
				reset(currentState.data.user || {})
			}
			else{
				//If return invalid userGetId - return to Page Home
				props.history.push('/Usuario')
			}
		}
	}, [currentState])
  return (
    <div>
        <ContentHeader
					title={!loading?titlePage:''}
					small={!loading?subtitlePage:''}
					breadcrumbPages={[{page:'Usuarios',link:'/Usuarios',active:false},
					{page:(id ?'Editar':'Novo'),link:'/Usuarios/Novo', active:true}]}
				/>
				 <Loading msg="Carregando" loading={loading} icon="refresh"/>
		{!loading &&
			<Content>
					<form onSubmit={onSubmit} className="formRegister">
						<Row>
							<Grid cols='12 6 3' >
								<Input.TextBox  name="name" type="text" label="Nome" edit={id?true:false}
									register={register} errors={errors.name}
									/>

							</Grid>
							<Grid cols='12 6 4' >
								<Input.TextBox  name="email" type="email" label="E-mail" edit={id?true:false}
									register={register} errors={errors.email}
									/>

							</Grid>
							<Grid cols='6 4 2' >
								<Input.Password  name="senha" label="Senha" edit={id?true:false}
									register={register} errors={errors.senha}
									/>

							</Grid>
							<Grid cols='12 3 2' >
								<Input.Select  name="nivel"  label="Nivel" register={register} edit={id?true:false}  errors={errors.nivel}>
										<option value="admin">Administrador</option>
										<option value="usr">Funcionário</option>
									</Input.Select>
							</Grid>

						</Row>
						<Row>
							<Grid cols='12 12 12' className='text-center actions'>
								<IconButton type="reset" icon="close" style="danger" onClick={()=>props.history.push('/Usuarios')}>Cancelar</IconButton>
								<IconButton disabled={!isDirty || isSubmitting} type="submit" icon="save" style="primary">Salvar {id && 'Alterações'}</IconButton>
							</Grid>
						</Row>
					</form>
			</Content>
				}
    </div>
  )
}
