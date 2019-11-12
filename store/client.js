export const state = () => ({
  jobsCreated: 0,
  jobsOnGoing: 0,
  jobsInDispute: 0
})

export const mutations = {
  SET_CREATED_JOBS(state, data) {
    state.jobsCreated = data
  },
  SET_JOBS_ON_GOING(state, data) {
    state.jobsOnGoing = data
  },
  SET_JOBS_IN_DISPUTE(state, data) {
    state.jobsInDispute = data
  }
}

export const actions = {
  getCreatedJobs(context, publicKey) {
    const key = `${publicKey}_JobCreated`
    return this.$axios
      .$get(
        `${context.rootState.wavesBaseURL}${context.rootState.dAppAddress}/${key}`
      )
      .then((data) => {
        context.commit('SET_CREATED_JOBS', data.value)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getOngoingJobs(context, publicKey) {
    const key = `${publicKey}_JobOnGoing`
    return this.$axios
      .$get(
        `${context.rootState.wavesBaseURL}${context.rootState.dAppAddress}/${key}`
      )
      .then((data) => {
        context.commit('SET_JOBS_ON_GOING', data.value)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getJobsInDispute(context, publicKey) {
    const key = `${publicKey}_JobInDispute`
    return this.$axios
      .$get(
        `${context.rootState.wavesBaseURL}${context.rootState.dAppAddress}/${key}`
      )
      .then((data) => {
        context.commit('SET_JOBS_IN_DISPUTE', data.value)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
