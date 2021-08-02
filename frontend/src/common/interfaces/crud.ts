import {ACTION_CRUD} from '../configs/actions'

interface Pagination {
	atualPage:number;
	totalRegister:number;
	perPage:number
}

export interface Columns {
	key:string;
	text:string;
	width?:string;
	sort?:true;
	sortInitial?:true;
	sortOrder?:string;
}

interface Options {
	key:string;
	text:string;
}
export interface Filters  {
	key:string;
	type:string;
	text?:string;
	placeHolder?:string;
	options?:Options[];

}

export interface ICrud {
	caption?:string;
	dataSet:object[];
	columns:Columns[];
	filters?:Filters[];
	actions:ACTION_CRUD[];
	pagination:Pagination;
	loading?:boolean|null;


	onNew?:()=>void;
	onEdit?:(e:string)=>void;
	onRemove?:(e:string)=>void;
	onActive?:(e:object)=>void;
	onView?:(e:string)=>void;
	onChangePage?:(e:number)=>void;
	onChangePerPage?:(e:number)=>void;
	onSort?:(e:string)=>void;
	onFilter?:(e:object)=>void;
}
