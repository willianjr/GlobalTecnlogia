import axios from 'axios'
import auth from './auth'

const aws = axios.create({
	baseURL:('https://run.mocky.io/v3/'
	)
})


export default aws
