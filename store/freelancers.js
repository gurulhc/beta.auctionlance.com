/* eslint-disable no-console */

export const state = () => ({
  freelancers: []
})

export const mutations = {
  LOAD_FREELANCERS(state, data) {
    const freelancers = data.filter((datum) => datum.userType === 'freelancer')
    state.freelancers = freelancers
  }
}
