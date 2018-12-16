import 'isomorphic-fetch'
import Cookies from 'universal-cookie'
import {firebase, auth} from '../../utils/firebaseConfig'
const cookies = new Cookies()
export const SSR_LOAD_COMPLETE = 'SSR_LOAD_COMPLETE'
export const LOADING = 'LOADING'
export const USER_STATUS = 'USER_STATUS'
export const SETTINGS_FETCHED = 'SETTINGS_FETCHED'
export const USER_LOGIN_REDIRECT = 'USER_LOGIN_REDIRECT'
export const UPDATING_SETTINGS = 'UPDATING_SETTINGS'
export const UPDATED_SETTINGS = 'UPDATED_SETTINGS'
export const COOKIE_USER = 'authUser'
export const USER_STATUS_ONLINE = 'online'
export const USER_STATUS_OFFLINE = 'offline'

export const login = (email, password) => {
	return (dispatch)=>{
		dispatch({ type: LOADING})
		auth.signInWithEmailAndPassword(email, password)
		authState(dispatch)
	}
}
export const register = (email, password) => {
	return (dispatch)=>{
		dispatch({ type: LOADING})
		auth.createUserWithEmailAndPassword(email, password)
		authState(dispatch)
	}
}
export const logout = () => {
	return (dispatch)=>{
		auth.signOut()
		dispatch({ type: USER_STATUS, status: USER_STATUS_OFFLINE})
	}
}
export const userStatus = (userID) => {
	return (dispatch)=>{
		if(userID) {
			dispatch({ type: USER_STATUS, status: USER_STATUS_ONLINE, userID})
		}
	}
}
export const authState =  (dispatch) => {
	auth.onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			cookies.set(COOKIE_USER, firebaseUser, { path: '/' })
			auth.currentUser.getIdToken(true).then( idToken => {
				cookies.set('idToken', idToken, { path: '/' })
			}).catch( error => {
				console.log('error', error)
			})
			dispatch({ type: USER_STATUS, status: USER_STATUS_ONLINE, userID: firebaseUser.uid})
			dispatch({ type: USER_LOGIN_REDIRECT})
		} else {
			localStorage.removeItem(COOKIE_USER)
		}
	})
}
