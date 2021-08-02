import React from 'react';
import { useForm } from "react-hook-form"

import {Filters} from '../../interfaces/crud'

import Input from '../inputs'
import IconButton from '../iconButton'


interface OwnProps{
	filters:Filters[],
	onSubmit:(data:any)=>void
}
type Props = OwnProps

export default function Filter (props:Props) {

	const {filters=[], onSubmit} = props
	const {register, setValue, handleSubmit,control, formState: {isDirty, isSubmitting, errors }, reset} = useForm<any>({defaultValues:{}});

	const onHandleSubmit = (data:any) =>{
		const fields = Object.entries(data).reduce((a:any,[k,v]) => (v ? (a[k]=v, a) : a), {})
		onSubmit(fields)
	}

		const renderFilters = () =>
		{

			 const filterOut =
			 	filters.map(data=>(
								<div key={`F_${data.key}`}>
										{
										data.type=='text' &&
												<Input.TextBox  name={data.key} type="text" label={data.text} edit={false} register={register} errors={errors.name}/>
										}
										{
										data.type=='select' &&
												<Input.Select name={data.key} label={data.text} register={register} errors={errors.name}>
													{
														data.options?.map((option)=>
																(
																	<option key={`opt${option.key}`} value={option.key}>{option.text}</option>
																)
															)
													}
												</Input.Select>
										}
								</div>
								))

				return (filterOut)
			}
		return(
				<div className='pesquisa'>
					<form onSubmit={handleSubmit((data:object)=> {onHandleSubmit(data)})} className='flex-sm-row'>
							{renderFilters()}
						<div>
									<IconButton disabled={isSubmitting} type='submit' icon='search' style='app'/>
						</div>
					</form>
				</div>
			)

}


