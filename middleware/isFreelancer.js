export default function({ store, redirect }) {
  // If the user is not a freelancer
  if (store.state.auth.user.userType !== 'freelancer') {
    return redirect('/')
  }
}
