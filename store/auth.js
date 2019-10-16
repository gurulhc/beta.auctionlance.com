/* eslint-disable no-console */
const wavesKeeperData =
  JSON.parse(localStorage.getItem('wavesKeeperData')) || {}
const defaultUser = {
  name: '',
  description: '',
  avatar: {},
  tags: [],
  location: '',
  address: '',
  publicKey: '',
  userType: ''
}

const userPayload = JSON.parse(localStorage.getItem('user')) || defaultUser

export const state = () => ({
  wavesKeeperData,
  user: userPayload,
  users: []
})

export const mutations = {
  GET_WAVES_KEEPER_DATA(state, data) {
    state.wavesKeeperData = data
  },
  LOG_OUT(state) {
    state.wavesKeeperData = {}
    state.user = {}
  },
  LOG_IN(state, data) {
    state.user = data
  },
  LOAD_USERS(state, data) {
    state.users = data
  }
}
