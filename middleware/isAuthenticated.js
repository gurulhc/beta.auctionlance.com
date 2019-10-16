export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.loggedIn) {
    alert('You are not logged in.Please Sign in with Keeper')
    return redirect('/')
  }
}
