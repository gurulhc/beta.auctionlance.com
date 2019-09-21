export const state = () => ({
  loggedIn: false,
  isLoading: false,
  dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
  acceptedAssets: [
    {
      name: 'Waves ',
      id: 'WAVES'
    },
    {
      name: 'Auct Token',
      id: '53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh'
    },
    {
      name: 'wBTC',
      id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
    },
    {
      name: 'wUSD',
      id: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
    },
    {
      name: 'wEUR',
      id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU'
    }
  ],
  wavesNode: {
    test: 'https://testnodes.wavesnodes.com'
  }
})

export const mutations = {
  UPDATE_LOGGED_IN_STATUS(state) {
    state.loggedIn = true
  }
}
