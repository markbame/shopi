import 'isomorphic-fetch'
import Cookies from 'universal-cookie'
import {firebase, auth} from '../../utils/firebaseConfig'
const cookies = new Cookies()

export const settings = () => {
  return (dispatch)=>{
    const messagesRef = firebase.database().ref('settings')
    messagesRef.on('value', snapshot => {
        let cleanData, key
        const keys = Object.keys(snapshot.val())
        for (var i = 0; i < keys.length; i++) {
          key = keys[i]
          cleanData = snapshot.val()[key]
        }
        dispatch({ type: 'SETTINGS_FETCHED', settings: {...cleanData, key } })
    },err=>{
      console.log('err',err)
    })
  }
}

export const updateSettings = (data) => {
  return (dispatch)=>{
      dispatch({ type: 'UPDATING_SETTINGS'})
      firebase.database().ref('settings/'+data.key).set(data, (error) => {
        if (!error) {
          console.log("Data hss been saved succesfully")
          dispatch({ type: 'UPDATED_SETTINGS', newSettings: data })
        }
      })
  }
}

export const login = (email, password) => {
  return (dispatch)=>{
      dispatch({ type: 'LOADING'})
      auth.signInWithEmailAndPassword(email, password)
      authState(dispatch)
  }
}

export const register = (email, password) => {
  return (dispatch)=>{
      dispatch({ type: 'LOADING'})
      auth.createUserWithEmailAndPassword(email, password)
      authState(dispatch)
  }
}

export const logout = () => {
  return (dispatch)=>{
      auth.signOut()
      dispatch({ type: 'USER_STATUS', status: 'offline'})
  }
}

export const authState =  (dispatch) => {
  auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      cookies.set('authUser', firebaseUser, { path: '/' })
      auth.currentUser.getIdToken(true).then( idToken => {
          cookies.set('idToken', idToken, { path: '/' })
      }).catch( error => {
        console.log("error", error)
      })
      dispatch({ type: 'USER_STATUS', status: 'online', userID: firebaseUser.uid})
      dispatch({ type: 'USER_LOGIN_REDIRECT'})
    } else {
      localStorage.removeItem('authUser')
    }
  })
}
