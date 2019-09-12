/* eslint-disable no-console */
const inBrowser = typeof window !== 'undefined'

export const state = () => ({
  userPublicKey: inBrowser
    ? JSON.parse(localStorage.getItem('userPublickKey'))
    : '',
  user: {}
})

export const mutations = {
  LOG_IN(state, data) {
    state.userPublicKey = data
  },
  LOG_OUT(state) {
    state.userPublicKey = ''
    localStorage.removeItem('userPublicKey')
    state.user = {}
  },
  UPDATE_USER_INFO(state, data) {
    state.user = data
  }
}
export const actions = {
  performWavesKeeperAuth({ commit, dispatch }) {
    const authData = {
      data: 'Auctionlance Platform',
      name: 'Auctionlance Platform',
      icon: 'http://auctionlance.com/aucttoken.svg',
      referrer: '/',
      successPath: '/'
    }

    if (inBrowser) {
      // eslint-disable-next-line no-undef
      WavesKeeper.auth(authData)
        .then((data) => {
          console.log(data)
          commit('LOG_IN', { data })
          localStorage.setItem('userPublicKey', JSON.stringify(data.publicKey))
          dispatch('logIn', data.publicKey)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  logIn({ commit, redirect }, publicKey) {
    this.$axios
      .$get(
        `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2/2qJK4ug9n3Lq53of3tuzLC5MLxgC7LWuAJrKSGJfph5m_Registered`
      )
      .then((res) => {
        console.log(JSON.parse(res.value))
        commit('UPDATE_USER_INFO', JSON.parse(res.value))
      })
      .catch((error) => {
        if (error.response && error.response.data.error === 304) {
          console.log("You don't have an account on Auctionlance")
          redirect('/register')
          return
        }
        console.log(error.response && error.response.data.message)
      })
  }
}
