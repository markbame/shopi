import * as firebase from 'firebase'
!firebase.apps.length && firebase.initializeApp({
	apiKey: 'AIzaSyCrt-1_02ShJLNx4daSFxGj4_SMPwy-2Jg',
	authDomain: 'shop-b925e.firebaseapp.com',
	databaseURL: 'https://shop-b925e.firebaseio.com',
	projectId: 'shop-b925e',
	storageBucket: 'shop-b925e.appspot.com',
	messagingSenderId: '976736971694'
})

const auth = firebase.auth()
export {
	auth,
	firebase
}
