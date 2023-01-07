import { getAuth } from 'firebase/auth'
import { getApps, initializeApp } from 'firebase/app'
import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_AUTH_DOMAIN } from '$env/static/public'

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
}

export async function initializeFirebase(): Promise<void> {
  if (getApps().length > 0) return

  console.log(firebaseConfig)

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  auth.useDeviceLanguage()
}
