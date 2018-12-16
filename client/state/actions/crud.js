import {firebase, auth} from '../../utils/firebaseConfig'
import {SSR_LOAD_COMPLETE, LOADING} from './users'
import _ from 'lodash'

export const list = (reference, type, ssr=false, limit=10, offset=0, order='') => {
	return (dispatch, adminDB)=>{
		dispatch({ type: LOADING })
		const db = (ssr)? adminDB: firebase.database()
		const messagesRef = db.ref(reference).limitToLast(limit)
		messagesRef.on('value', snapshot => {
			let data = [], key
			if(snapshot.val() != null) {
				const keys = Object.keys(snapshot.val())
				for (var i = 0; i < keys.length; i++) {
					key = keys[i]
					data.push({...snapshot.val()[key], key, id: key})
				}
			}
			dispatch({ type , data: _.orderBy(data, ['date'],['desc']) })
		},err=>{
			console.log('err',err)
		})
	}
}

export const get = (reference, type, userID=false, ssr=false ) => {
	return (dispatch, adminDB, eventEmitter ) => {
		const db = (ssr)? adminDB: firebase.database()
		const messagesRef = db.ref(reference)
		dispatch({ type: LOADING })
		messagesRef.once('value', snapshot => {
			dispatch({ type , data: snapshot.val() })
			if(ssr) {
				dispatch({ type: 'USER_STATUS' , userID, status: 'online' })
				eventEmitter.emit(SSR_LOAD_COMPLETE)
			}
		},err=>{
			console.log('err',err)
		})
	}
}

export const update = (data, reference, type) => {
	return (dispatch)=>{
		dispatch({ type: LOADING })
		firebase.database().ref(reference).set(data, (error) => {
			if (!error) {
				dispatch({ type, newData: data })
			}
		})
	}
}

export const create = (data, reference, type) => {
	return (dispatch)=>{
		dispatch({ type: LOADING })
		firebase.database().ref(reference).push(data).then((snap) => {
			const key = snap.key
			dispatch({ type, newData: {...data, key} })
		})
	}
}

export const deleteData = ( reference ) => {
	firebase.database().ref(reference).remove().then((snap) => {
		console.log('data deleted')
	})
}
