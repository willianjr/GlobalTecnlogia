import React, {ReactNode, Component, useState, useEffect} from 'react'
import './index.scss'

import Grid from '../layout/grid'
import Row from '../layout/row'
import IconButton from '../iconButton'
import Pagination from './pagination'
import Filter from './filter'

import {ACTION_CRUD} from '../../configs/actions'
import {ICrud, Columns} from '../../interfaces/crud'

interface StateProps{
	sort:{
		column:string,
		order:string,
	},
	selected: string[],

}

const initialState:StateProps = {
	sort:{
			column:'',
			order:''
	},
	selected:[]
}
 class Crud extends Component<ICrud,StateProps>{
   constructor(props:ICrud)
	 {
			super(props)
			this.state = {...initialState}
     	this.checkAll = this.checkAll.bind(this)
     	this.changeMultiplesActions = this.changeMultiplesActions.bind(this)
	 }
	 componentDidMount(){
		const {columns,onSort} = this.props

		const column 								= columns.filter(value=>{return value.sortInitial==true})
		const columnFilter:Columns  = column.length > 0 ? column[0] : {key:'', sortOrder:'', text:''}

		this.setState(
					{...this.state,
						sort:{
									column:columnFilter.key,
									order:columnFilter.sortOrder || ''
								}
					})
		setTimeout(()=>{onSort &&  this.changeSort(onSort, columnFilter)},100)

	 }
	 enableButton(action:ACTION_CRUD)
	 {
			 //Actions são passadas na propriedades pra informar quais actions terá no crud
			 const {actions} = this.props
			 const t = actions.filter((value)=>{ return value===action })
			 //console.log(`${action} - ${t}`)
			 return (actions.filter((value)=>{ return value===action })).length == 1 ? true : false
	 }
	 removeConfirm(onRemove:(x:string)=>void,id:string)
    {
        //Metodo padrão para confirmar a remoção do registro
        //Button Acion: Remove
        if(confirm('Deseja remover o registro?')){
            //Caso confirme chama onRemove do pai
            return onRemove(id)
        }
        else{
            return false
        }
  }
	changePerPage(event:any){
		const perPage:number = +event.target.value
		const {onChangePerPage } = this.props
		onChangePerPage && onChangePerPage(perPage)

	}
	changeSort(onSort:(x:string)=>void, data:Columns)
	{
        const order = (data.sortOrder == this.state.sort.order) ? (data.sortOrder) : this.state.sort.order
        const orderState =  order =='ASC'?'DESC':'ASC'
        const formatOrder = order =='DESC'?'-':''
        this.setState({...this.state,
					sort:{column:data.key,
								order:orderState},
									selected:[]})
					return onSort(`${formatOrder}${data.key}`)
	}
	checkAll()
	{
			const {dataSet} = this.props
			const listCheck = (dataSet.length>this.state.selected.length)
															&& dataSet.map((data:any,index)=>{
															return (data._id)
													})
			this.setState({...this.state,selected:listCheck||[]})
	}
	checkOne(id:string)
	{
			const listCheck = this.state.selected
			const exists = listCheck.includes(id)
			const newListCheck = exists ? listCheck.filter((value)=>{ return value!=id}) : [...listCheck,id]
			this.setState({...this.state,selected:newListCheck})
	 }
	changeMultiplesActions(event:any)
	{
			const {dataSet,onRemove,onActive } = this.props
			const action = event.target.value
			const listSelected = this.state.selected||[]
			let remove = false

			console.log("action",action)

			if(action=='remove' && confirm('Deseja remover os registros selecionados?')){
					remove = true
			}
			listSelected.map(value=>{
					const data:any = dataSet.filter((registro:any)=>{ return (registro._id==value)})[0]
					switch(action){
							case 'active':
								onActive && onActive({...data,active:false})
							break
							case 'noactive':
								onActive && onActive({...data,active:true})
							break
							case 'remove':
									remove && onRemove &&  onRemove(value)
							break
							default:
									return false
									break
					}
				})

				this.setState({...this.state,selected:[]})
	}
	render(){

			const {caption, pagination:{totalRegister, atualPage, perPage}, filters=[],dataSet = [], columns = [], actions=[], loading=false} = this.props
			const {onActive, onEdit, onRemove, onView, onNew, onSort, onFilter, onChangePage} = this.props
			const existDataSet = dataSet.length >= 0? true : false
			const existActions = actions.length > 0? true : false
			const exibeRegister = ()=>{
           	const total = ((atualPage+1) * perPage) - perPage
						return total>totalRegister?totalRegister:total
			}
			return (
					<div className='crud'>
							<header>
										<IconButton icon='plus-square' style='primary'
											onClick={onNew}
                    	hide={!onNew || !this.enableButton(ACTION_CRUD.NEW)}>
												Novo Registro
										</IconButton>
										{ filters.length > 0 && onFilter &&
											(
												<Filter onSubmit={(data) => onFilter(data) } filters={filters}/>
												)
										}
               </header>
							 {!loading &&
							 <table className="table">
							 	{ caption &&
								 	(
							 		<caption>{caption}</caption>
							 		)
								 }
								 <thead>
									 <tr>
											{
												this.enableButton(ACTION_CRUD.MULTI) && (
														<th className='thCheck' >
																<IconButton
																		icon={`${dataSet.length>this.state.selected.length?'square':'check-square'}`}
																		style='bg-nav' onClick={this.checkAll}
																/>
														</th>
														)
											}
								 			{
											 		//render columns
												 	columns.map((data,index)=>
													 (
														<th key={`${data.text}${index}`} style={{width:data.width}}>
																{data.text}
																{onSort &&
																<IconButton
                       					 hide={data.sort!=true}
                        					icon={this.state.sort.column==data.key?
                                	(this.state.sort.order=='DESC'?
                               	 'sort-down':'sort-up'):'unsorted'}
                        					style='default btn-sm'
                        					onClick={() => onSort && this.changeSort(onSort,data)}/>
																	}
															</th>
														)
														)
											 }
											 {
											 		existActions &&
													(
														<th className='thActions' style={{width:`${(actions.length)*2.1}rem`}}>Ações</th>
													)
												}
									 </tr>
								 </thead>
								 <tbody>
												{existDataSet &&
												(
													dataSet.map((data:any,index)=>(
														<tr key={`tr_${index}`}>

															{
																this.enableButton(ACTION_CRUD.MULTI) && (
																	<td className="tdCheck">
																			<IconButton icon={`${this.state.selected.includes(data._id)?'check-square':'square'}`}
																				style='bg-nav'
																				onClick={()=> this.checkOne(data._id)}/>
																	</td>
																		)
															}
															{
																columns.map((column) =>(
																			<td key={`td_${column.key}`} className={`${data.active?'actives':'noactives'}`}>
																				{String(data[column.key])}
																			</td>
																		)
																)
															}
																<td className='tdActions'>
																		<>
																		<IconButton icon={!data.active?'toggle-off':'toggle-on'} style='bg-nav'
																				title={!data.active?'Ativar Registro':'Desativar Registro'}
																				hide={!onActive || !this.enableButton(ACTION_CRUD.ACTIVE)}
																				onClick={() => onActive && onActive(data)}/>
																		<IconButton icon='edit' style='primary' title="Editar Registro"
																				hide={!onEdit || !this.enableButton(ACTION_CRUD.EDIT)}
																				onClick={() => onEdit && onEdit(data._id)}/>
																		<IconButton icon='eye' style='primary'  title="Visualizar Registro"
																				hide={!onView || !this.enableButton(ACTION_CRUD.VIEW)}
																				onClick={() => onView && onView(data)}/>
																		<IconButton icon='trash' style='danger' title="Remover Registro"
																				hide={!onRemove || !this.enableButton(ACTION_CRUD.REMOVE)}
																				onClick={()=> onRemove && this.removeConfirm(onRemove,data._id)}/>
																		</>
																</td>
														</tr>
													)
													)
												)
												||
												 (
													<tr>
														<td colSpan={100}>
															<Row className='no-register flex-row  align-items-center align-content-center'>
																	<span>Nenhum registro encontrado!</span>
															</Row>
														</td>
													</tr>
													)
												}
								 </tbody>
								 { existDataSet && (
									<tfoot>
										<tr>
											<td colSpan={100}>
												<Row className='footer flex-sm-row flex-column justify-content-between align-items-stretch'>
															{this.state.selected.length>=2 &&
																(
																	<div className="d-flex flex-row justify-content-between align-items-center mr-1">
																			<i className="fa fa-level-up fa-lg fa-rotate-90 mr-1"></i>
																			<select id="actionCheck" className='form-control' onChange={e=>this.changeMultiplesActions(e)}>
																					<option value="">Selecione</option>
																							<option disabled={!onActive || !this.enableButton(ACTION_CRUD.ACTIVE)} value="active">Ativar Registros</option>
																							<option disabled={!onActive || !this.enableButton(ACTION_CRUD.ACTIVE)} value="noactive">Desativar Registros</option>
																							<option disabled={!onRemove || !this.enableButton(ACTION_CRUD.REMOVE)} value="remove">Remover Registros</option>
																			</select>
																	</div>
																)
															}
														<div className="flex-fill">
																	<Pagination atualPage={atualPage} totalRegister={totalRegister} perPage={perPage} changePages={(page) => onChangePage && onChangePage(page)}/>
															</div>
															<div className='align-self-center'>
																		<span> Exibindo {exibeRegister()} de {totalRegister} Registro(s)</span>
															</div>
												</Row>
											</td>
										</tr>
									</tfoot>
							  )
							}
							</table>
							}
					  </div>
        )
    }
}

export default Crud


