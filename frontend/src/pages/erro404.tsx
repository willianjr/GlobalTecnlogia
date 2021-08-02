import React from 'react'
import IPage from '../common/interfaces/page'

import ContentHeader from '../common/components/layout/contentHeader'
import Content from '../common/components/layout/content'

function  Index () { return(
         <>
				 <ContentHeader
					title='Página não encontrada!'
					small='A página que tentou acessar não existe!'
					breadcrumbPages={[{page:'Página não encontrada',link:'/',active:true}]}
				/>

    		</>
    )
}
export default Index
