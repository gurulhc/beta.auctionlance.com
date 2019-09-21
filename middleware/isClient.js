export default function({ store, redirect }) {
  // If the user is not a client
  if (store.state.auth.user.userType !== 'client') {
    return redirect('/')
  }
}
