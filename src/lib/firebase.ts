import { getApps, initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_AUTH_DOMAIN } from '$env/static/public'

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
}

export function initializeFirebase() {
  if (getApps().length > 0) return

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  auth.useDeviceLanguage()
}

export async function login() {
  const google = new GoogleAuthProvider()
  const apps = getApps()
  const auth = getAuth(apps[0])

  try {
    const { user } = await signInWithPopup(auth, google)

    console.log(user)
  } catch (e) {
    console.log(e)
  }
}
