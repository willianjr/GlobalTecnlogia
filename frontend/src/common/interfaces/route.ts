export default interface IRoute {
	path: string;
	name: string;
	exact?: boolean;
	component: any;
	props?: any;
	auth?:boolean;
	level?:number;
	isLogado?:boolean;
}
