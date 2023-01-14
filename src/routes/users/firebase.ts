import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getApps } from 'firebase-admin/app'
import { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from '$env/static/private'

export function initializeFirebaseApp() {
  const apps = getApps()

  if (apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    })
  }
}

export async function verifyIdToken(idToken: string) {
  const { aud, uid } = await getAuth().verifyIdToken(idToken)

  if (aud === FIREBASE_PROJECT_ID) {
    return uid
  } else {
    return undefined
  }
}
