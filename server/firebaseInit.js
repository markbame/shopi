
var serviceAccount = require('./serviceAccount.json')
import * as admin from 'firebase-admin'
import cfg from '../config'

const firebaseApp = () => {
	const {private_key_id, private_key, client_id, project_id} = cfg
	const firebaseAppAccount = {
		...serviceAccount,
		private_key_id, private_key, client_id, project_id
	}
	const applicationName = 'storeapp'
	try {
		let firstApp = admin.app(applicationName)
		return firstApp
	} catch (error) {
		return admin.initializeApp({
			credential: admin.credential.cert(firebaseAppAccount),
			databaseURL: 'https://shop-b925e.firebaseio.com'
		}, applicationName)
	}
}

export const adminAuth = (firebaseApp()).auth()
export const adminDB = (firebaseApp()).database()
