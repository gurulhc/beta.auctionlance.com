export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.loggedIn) {
    alert('🔒 Please Sign in with Waves Keeper')
    return redirect('/')
  }
}
