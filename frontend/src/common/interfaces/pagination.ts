export default interface IPagination {
	atualPage:number,
	totalRegister:number,
	perPage:number
	changePages:(x:number)=>void
}
