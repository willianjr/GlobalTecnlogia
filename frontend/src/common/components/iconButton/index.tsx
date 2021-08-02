import { ReactNode} from 'react'
import './index.css'

import IIconButton from '../../interfaces/iconbutton'


export default (props:IIconButton) =>(
		<>
		{!props.hide &&
			<button type={props.type ||'button'}
							className={'iconButton btn btn-'+ props.style}
							onClick={props.onClick}
							disabled={props.disabled}
							title={props.title}>
				<i className={'fa fa-'+ props.icon}/>
					{props.children &&
							<span>{props.children}</span>
					}
			</button>
			}
			</>
	)
