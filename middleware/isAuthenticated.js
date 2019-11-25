export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.loggedIn) {
    store.$toast.info('Sign in with Keeper')
    return redirect('/')
  }
}
