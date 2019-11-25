/* eslint-disable no-console */
import setUpBlockchainEnvironment from '@/helpers/getBlockchainEnv'

// Getting the correct environment. values: main | test
const environment = setUpBlockchainEnvironment('main')

const loggedIn = localStorage.getItem('loggedIn') || false
const currentUserKey = localStorage.getItem('currentUserKey') || ''

export const state = () => ({
  loggedIn,
  isLoading: false,
  dAppAddress: environment.dAppAddress,
  acceptedAssets: [
    {
      name: 'Waves ',
      id: 'WAVES'
    }
    // {
    //   name: 'Auct Token',
    //   id: '53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh'
    // },
    // {
    //   name: 'wBTC',
    //   id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
    // },
    // {
    //   name: 'wUSD',
    //   id: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
    // },
    // {
    //   name: 'wEUR',
    //   id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU'
    // }
  ],
  categories: [
    'Web Design & Development',
    'Waves RIDE & Smart Contract',
    'Mobile App',
    'Graphics & Design',
    'Writing & Translation',
    'Video & Animation'
  ],
  wavesBaseURL: environment.baseUrl,
  jobs: [],
  fetchingJobsStatus: 'IDLE',
  currentUserKey,
  currentAuctionData: [],
  showSignInSnackbar: false
})

export const mutations = {
  UPDATE_LOGGED_IN_STATUS(state) {
    state.loggedIn = true
  },
  RESET_LOGGED_IN_STATE(state) {
    state.loggedIn = false
  },
  LOAD_JOBS(state, data) {
    const blacklistedJobs = ['T8JVu2XnhpshsiERX6VPdHjgQ8jQwrQC5dnBjqYK5Hm']
    const preparedJobs = data.filter(
      (job) => !blacklistedJobs.includes(job.key.split('_')[0])
    )
    state.jobs = preparedJobs
  },
  UPDATE_FETCHING_JOBS_STATUS(state, data) {
    state.fetchingJobsStatus = data
  },
  RESET_FETCHING_JOBS_STATUS(state, data) {
    state.fetchingJobsStatus = 'IDLE'
  },
  UPDATE_CURRENT_USER_KEY(state, data) {
    state.currentUserKey = data
  },
  UPDATE_CURRENT_AUCTION_DATA(state, data) {
    state.currentAuctionData = data
  }
}

export const actions = {
  loadJobs(context) {
    context.commit('RESET_FETCHING_JOBS_STATUS', 'IDLE')
    context.commit('UPDATE_FETCHING_JOBS_STATUS', 'FETCHING')
    return this.$axios
      .$get(
        `${context.state.wavesBaseURL}${context.state.dAppAddress}?matches=.*?_Info$`
      )
      .then((data) => {
        const jobs = data
        const filteredJobs = jobs.filter(
          (job) => job.value !== 'newAuctiondata'
        )
        const preparedJobs = filteredJobs.map((job) => {
          return {
            info: JSON.parse(job.value),
            key: job.key
          }
        })
        context.commit('LOAD_JOBS', preparedJobs)
        context.commit('UPDATE_FETCHING_JOBS_STATUS', 'SUCCESSFUL')
      })
      .catch((_) => {
        context.commit('UPDATE_FETCHING_JOBS_STATUS', 'ERROR')
      })
  },
  updateCurrentUserKey(context, data) {
    context.commit('UPDATE_CURRENT_USER_KEY', data)
  },
  updateLoggedInStatus(context) {
    context.commit('UPDATE_LOGGED_IN_STATUS')
  }
}
