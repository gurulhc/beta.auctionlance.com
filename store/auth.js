/* eslint-disable no-console */

export const state = () => ({
  wavesKeeperData: {},
  user: {
    name: '',
    description: '',
    avatar: {},
    tags: [],
    location: '',
    address: '',
    publicKey: ''
  },
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
