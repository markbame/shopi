
var serviceAccount = require("./serviceAccount.json")
import * as admin from 'firebase-admin'

const firebaseApp = () => {
  const applicationName = 'storeapp'
  try {
     let firstApp = admin.app(applicationName)
     return firstApp
   } catch (error) {
     return admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
       databaseURL: "https://shop-b925e.firebaseio.com"
     }, applicationName)
   }
}

export const adminAuth = (firebaseApp()).auth()
export const adminDB = (firebaseApp()).database()
