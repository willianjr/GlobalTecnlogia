import {ReactNode} from 'react'

declare interface Props {
    children:ReactNode,
    test:Boolean
}
export default (props:Props) => {
    if(props.test) {
        return (props.children)
    } else {
        return false
    }
}
