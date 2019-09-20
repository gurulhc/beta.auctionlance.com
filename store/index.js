export const state = () => ({
  loggedIn: false,
  isLoading: false,
  dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
  wavesNode: {
    test: 'https://testnodes.wavesnodes.com'
  }
})

export const mutations = {
  UPDATE_LOGGED_IN_STATUS(state) {
    state.loggedIn = true
  }
}
