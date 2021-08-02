import { all, takeLatest,takeEvery,takeLeading } from 'redux-saga/effects';

import {UsersTypes} from './users/types'
import {getAll, getId, deleteId,save}   from './users/sagas'

import {AuthTypes} from './auth/types'
import {login, logout}   from './auth/sagas'

export default function* rootSaga():any{

	return yield all([
		takeLatest(UsersTypes.GETID, getId),
    takeLatest(UsersTypes.GETALL, getAll),
    takeLatest(UsersTypes.DELETE, deleteId),
    takeLatest(UsersTypes.SAVE, save),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.LOGOUT, logout)
  ])
}
