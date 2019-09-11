export const state = () => ({
  isLoading: false
})

export const mutations = {
  UPDATE_LOADING_STATUS(state) {
    state.isLoading = !state.isLoading
  }
}

export const actions = {
  updateLoadingStatus({ commit }) {
    commit('UPDATE_LOADING_STATUS')
  }
}
