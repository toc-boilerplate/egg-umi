import { login, logout, getUserinfo } from '../services'

export default {
  namespace: 'user',
  state: {
    loginfo: {},
    userinfo: {},
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(login, payload)
      yield put({
        type: 'setLoginfo',
        payload: data,
      })
    },
    *logout({ payload }, { call, put }) {
      yield call(logout, payload)
      yield put({
        type: 'setLoginfo',
        payload: {},
      })
    },
    *getUserinfo({ payload }, { call, put }) {
      const data = yield call(getUserinfo, payload)
      yield put({
        type: 'setUserinfo',
        payload: data,
      })
    },
  },
  reducers: {
    setLoginfo(state, { payload }) {
      if (payload?.access_token) {
        localStorage.setItem('token', payload.access_token)
      } else {
        localStorage.removeItem('token')
      }
      state.loginfo = payload
    },
    setUserinfo(state, { payload }) {
      state.userinfo = payload
    },
  },
}
