/* eslint-disable no-console */
export const state = () => ({
  isAuthenticated: false,
  wavesKeeperData: {}
})

export const mutations = {
  LOG_IN(state, data) {
    state.isAuthenticated = true
    state.wavesKeeperData = data
  },
  LOG_OUT(state) {
    state.isAuthenticated = false
    state.wavesKeeperData = {}
  }
}
export const actions = {
  performWavesKeeperAuth({ state, commit }) {
    const authData = {
      data: 'Auctionlance Platform',
      name: 'Auctionlance Platform',
      icon: 'http://auctionlance.com/aucttoken.svg',
      referrer: '/',
      successPath: '/'
    }

    // eslint-disable-next-line no-undef
    WavesKeeper.auth(authData)
      .then((data) => {
        console.log(data)
        commit('LOG_IN', { data })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
