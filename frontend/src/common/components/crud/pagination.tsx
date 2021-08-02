import React, {ReactNode,Component} from 'react';
import IPagination from '../../interfaces/pagination'


class Pagination extends Component<IPagination> {
    constructor(props:IPagination){
        super(props)
    }
    renderRow(row:number)
    {
        const {atualPage,changePages} = this.props
        return(
            <li key={`row_${row}`} className={`page-item ${atualPage==row?'active':''}`}>
                <a className="page-link" onClick={()=>changePages(row)} >{row}</a>
            </li>
        )
    }
    render(){
        const {atualPage,totalRegister=1,perPage=10,changePages} = this.props
        const pages=[]
        //Calculo de quantas páginas a pagination terá
        const totalPages = Math.ceil(totalRegister/perPage)
        //CONDIÇÃO PARA EXIBIR LIMITAÇÃO DE PAGINAS NA PAGINAÇÃO
        const pageIni = (atualPage>5 && totalPages>5) ? (atualPage-3):1
        const pageFim = (atualPage>5 && totalPages>5) ? ((atualPage+3)<totalPages)? (atualPage+3) : totalPages : (totalPages<6?totalPages:6)
        for(let i=pageIni; i<=pageFim; i++){ pages.push(i) }

        return(
         (totalPages>1 &&
            <nav aria-label="Paginação" className='navPagination'>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${atualPage<=1?'disabled':''}`}>
                        <a className="page-link" onClick={()=>changePages(atualPage-1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {pages.map(row=>this.renderRow(row))}
                    <li className={`page-item ${atualPage>=totalPages?'disabled':''}`}>
                        <a className="page-link" onClick={()=>changePages(atualPage+1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
         )
        )
    }

}

export default Pagination
