import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch } from 'redux'
import { useHistory } from 'react-router-dom'

import {Data,Crud} from '../../main/store/ducks/users/types'
import {ApplicationState} from '../../main/store/index'

import * as UsersActions from '../../main/store/ducks/users/actions'
import {ACTION_CRUD} from '../../common/configs/actions'

import ContentHeader from '../../common/components/layout/contentHeader'
import Content from '../../common/components/layout/content'
import CrudPage from '../../common/components/crud'
import Loading from '../../common/components/loading'

//INTERFACES
interface StateProps{
	Users:Data,
	crud: Crud,
	loading:boolean|null,
	history:any
}
interface DispatchProps{
	userGetAll(filter?:Crud):void
	userDelete(id:string,filter?:Crud):void
	userChangePage(page:number,filter?:Crud):void
	userSort(sort:string,filter?:Crud):void
	userFilter(filters:any,filter?:Crud):void
}

type Props = StateProps & DispatchProps

class UserList extends Component<Props>{
	componentDidMount(){
		//get all registers
		this.props.userGetAll()
	}

	render(){
		const {Users:{list:UserList},
						crud:{registerPerPage,totalRegister, atualPage, sort, filters},
						loading} = this.props

		const filterCrud:Crud =
						{
							atualPage:atualPage,
							registerPerPage:registerPerPage,
							totalRegister:totalRegister,
							filters,
							sort:sort}

		return(
    <div>
        <ContentHeader
					title=''
					small=''
					breadcrumbPages={[{page:'Usuários',link:'/Usuarios',active:true}]}
				/>
				<Loading msg="Carregando" loading={loading} icon="refresh"/>
        <Content>
						 <CrudPage
						 		loading={loading}
								dataSet={UserList}
								columns={[{key:'name',text:'Nome',width:'10rem', sort:true, sortInitial:true, sortOrder:'ASC'},
														{key:'email',text:'E-mail',  sort:true},
														{key:'nivel',text:'Nivel', width:'5rem'}]}
								actions={[ACTION_CRUD.NEW, ACTION_CRUD.EDIT, ACTION_CRUD.REMOVE, ACTION_CRUD.MULTI]}
								pagination={
									{
										atualPage:atualPage,
										totalRegister:totalRegister,
										perPage:100
									}
								}
								onNew={()=>this.props.history.push('/Usuarios/Novo')}
								onEdit={(id)=>{ this.props.history.push(`/Usuarios/Editar/${id}`)}}
								onRemove={(id)=>{ this.props.userDelete(id, filterCrud) }}
								onChangePage={(page)=>{this.props.userChangePage(page,{...filterCrud, atualPage:page})}}

						/>
				</Content>
    </div>
	)}
}

const mapStateToProps = ({users}: ApplicationState) => ({
  Users: users.data||[],
	crud: users.crud,
	loading: users.loading

})
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UsersActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserList)

