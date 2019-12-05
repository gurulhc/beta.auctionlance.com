/* eslint-disable no-console */
let wavesKeeperData = {}

if (process.browser) {
  wavesKeeperData = JSON.parse(localStorage.getItem('wavesKeeperData')) || {}
}
const defaultUser = {
  name: '',
  description: '',
  avatar: {},
  tags: [],
  location: '',
  address: '',
  public_key: '',
  userType: ''
}

let userPayload = defaultUser

if (process.browser) {
  userPayload = JSON.parse(localStorage.getItem('user')) || defaultUser
}

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

export const actions = {
  getUsers(context) {
    function isJson(str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    }
    this.$axios
      .$get(
        `${context.rootState.wavesBaseURL}${context.rootState.dAppAddress}?matches=.*?(_Freelancer|_Client)$`
      )
      .then((data) => {
        const users = data
        let preparedUsers = users.filter((user) => isJson(user.value))
        preparedUsers = preparedUsers.map((user) => {
          const auctionlanceUser = JSON.parse(user.value)
          auctionlanceUser.public_key = user.key.split('_')[0]
          return auctionlanceUser
        })
        context.commit('LOAD_USERS', preparedUsers)
      })
      .catch((_) => {})
  },
  setLoggedInUser(context, data) {
    context.commit('LOG_IN', data)
  },
  logOut(context) {
    if (process.brower) {
      localStorage.clear()
      context.commit('LOG_OUT')
      context.commit('RESET_LOGGED_IN_STATE', { root: true })
    }
  }
}
