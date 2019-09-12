export const state = () => ({
  isLoading: false,
  dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
  wavesNode: {
    test: 'https://testnodes.wavesnodes.com'
  }
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
