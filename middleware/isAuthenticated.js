export default function({ store, redirect }) {
  // If the user is not authenticated
  if (
    typeof window !== 'undefined' &&
    !JSON.parse(localStorage.getItem('userPublicKey'))
  ) {
    return redirect('/')
  }
}
