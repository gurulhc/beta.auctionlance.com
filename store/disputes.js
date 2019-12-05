export const state = () => ({
  arbiters: [
    '39uyz5scczgino89GkwqYRkj9gaGUqLpD1JZ8SLGFHLH',
    'B5GEtwJoBVCTiQR8HPRR2hiaMqGavy9JSuh2Pj5tRioB',
    '89JmwM761WSakCtvaAWe2kHYBpPp27Syu2eXWUu5j6d3',
    '638RJyU6feWxo426njWD9z77T7zywpu3iJu1pt1p5rwU',
    'GqHnxeEcEP3L5XsBW6yYZParr4HUbtP377ePccJPVcp6',
    '2ituwW7DSRsLP3Vcbnpr98QUQMGFRWKmyYPFqsUKRDoP'
  ],
  jobsStates: [],
  gettingJobStateStatus: 'IDLE',
  jobsInDisputeInfo: [],
  currentDisputes: [],
  preparedDisputes: []
})

export const getters = {
  isArbiter(state, getters, rootState) {
    // return state.arbiters.includes(
    //   'GqHnxeEcEP3L5XsBW6yYZParr4HUbtP377ePccJPVcp6'
    // )
    return state.arbiters.includes(rootState.auth.user.public_key)
  },
  jobsInDispute(state, getters) {
    // eslint-disable-next-line no-useless-return
    if (!getters.isArbiter) return
    return state.jobsStates.filter((job) => job.value === 'Dispute')
  },
  jobsInDisputeCount(state, getters) {
    return getters.jobsInDispute ? getters.jobsInDispute.length : 0
  }
}

export const mutations = {
  SET_JOBS_STATES(state, payload) {
    state.jobsStates = payload
  },
  UPDATE_GETTING_JOB_STATE_STATUS(state, payload) {
    state.gettingJobStateStatus = payload
  },
  RESET_GETTING_JOB_STATE_STATUS(state) {
    state.gettingJobStateStatus = 'IDLE'
  },
  SET_JOBS_IN_DISPUTE_INFO(state, payload) {
    state.jobsInDisputeInfo.push(payload)
  },
  SET_UP_CURRENT_DISPUTES(state, payload) {
    state.currentDisputes.push(payload)
  },
  SET_UP_PREPARED_DISPUTES(state, payload) {
    state.preparedDisputes.push(payload)
  }
}

export const actions = {
  getJobsState(context) {
    context.commit('RESET_GETTING_JOB_STATE_STATUS')
    context.commit('UPDATE_GETTING_JOB_STATE_STATUS', 'FETCHING')
    const regex = '(.*)?(_State)$'
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          `${context.rootState.wavesBaseURL}${context.rootState.dAppAddress}?matches=${regex}`
        )
        .then((data) => {
          context.commit('UPDATE_GETTING_JOB_STATE_STATUS', 'SUCCESSFUL')
          context.commit('SET_JOBS_STATES', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getJobsInDisputeInfo(context) {
    if (!context.getters.jobsInDispute.length) return
    const disputes = context.getters.jobsInDispute
    return new Promise((resolve, reject) => {
      disputes.map((job) => {
        this.$axios
          .$get(
            `${context.rootState.wavesBaseURL}${
              context.rootState.dAppAddress
            }/${job.key.split('_')[0]}_Info`
          )
          .then((data) => {
            context.commit('SET_JOBS_IN_DISPUTE_INFO', data)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
  },
  setUpJobs(context) {
    if (!context.state.jobsInDisputeInfo.length) return
    const jobsInDisputeInfo = context.state.jobsInDisputeInfo
    return new Promise((resolve, reject) => {
      jobsInDisputeInfo.map((job) => {
        return this.$axios
          .$get(
            `${context.rootState.wavesBaseURL}${
              context.rootState.dAppAddress
            }/${job.key.split('_')[0]}_DisputeVotes`
          )
          .then((data) => {
            const payload = {
              info: JSON.parse(job.value),
              key: job.key.split('_')[0],
              votes: data.value
            }
            context.commit('SET_UP_CURRENT_DISPUTES', payload)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
  },
  updateDisputedJobsWithAmbassadorVote(context) {
    const currentDisputes = context.state.currentDisputes
    return new Promise((resolve, reject) => {
      currentDisputes.map((job) => {
        return this.$axios
          .$get(
            `${context.rootState.wavesBaseURL}${
              context.rootState.dAppAddress
            }/${job.key.split('_')[0]}_DiputeVote_${
              context.rootState.auth.user.public_key
            }`
          )
          .then((data) => {
            const payload = {
              ...job,
              currentAmbassadorVote: data.value
            }
            context.commit('SET_UP_PREPARED_DISPUTES', payload)
            resolve(data)
          })
          .catch((error) => {
            const payload = {
              ...job,
              currentAmbassadorVote: null
            }
            context.commit('SET_UP_PREPARED_DISPUTES', payload)
            reject(error)
          })
      })
    })
  }
}
