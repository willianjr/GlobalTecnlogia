import { combineReducers} from 'redux'

import { reducer as toastrReducer} from 'react-redux-toastr'

import users from './users'
import auth from './auth'

export default combineReducers({
	users,
	auth,
	toastr: toastrReducer
})
