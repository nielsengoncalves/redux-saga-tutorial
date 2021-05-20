import {takeEvery, call, fork, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users'

function* getUsers() {
    try {
        const result = yield call(api.getUsers)
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }))
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to get users'
        }))
    }
}

function* createUser(action) {
    try {
        yield call(api.createUser, action.payload)
        yield call(getUsers)
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }))
    }
}

function* deleteUser(action) {
    try {
        yield call(api.deleteUser, action.payload.userId)
        yield call(getUsers)
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the users'
        }))
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}


function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* watchDeleteUserRequest() {
    yield takeLatest(actions.Types.DELETE_USER_REQUEST, deleteUser)
}

const UsersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
]

export default UsersSagas;