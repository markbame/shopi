import React from 'react'
import StaticRouter from 'react-router-dom/StaticRouter'
import App from '../client/app'
import cfg from '../config'
const PROJECT_TITLE = cfg.project_title
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { reducers } from '../client/state/reducers/'
import { userStatus, checkToken, invokeError, SSR_LOAD_COMPLETE } from '../client/state/actions/users'
import express from 'express'
import routes from '../client/routes'
const router = express.Router()
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)))
import Cookies from 'universal-cookie'
import events from 'events'
import {adminAuth, adminDB} from './firebaseInit'
const eventEmitter = new events.EventEmitter()

router.get('*', (req, res) => {
  let error = false

  const branch = matchRoutes(routes, req.url)
  const promises = branch.map(({ route, match }) => {
    let fetchData = route.component.fetchData
    const cookies = new Cookies(req.cookies)
    const idToken = cookies.get('idToken')
    const authUser = cookies.get('authUser')
    try {
      userStatus(authUser, authUser.uid)(store.dispatch)
      checkToken(idToken)(store.dispatch, adminAuth, eventEmitter, res)
    } catch (e) {
      console.log("Error::Invalid Auth")
      error= true
    }

    return fetchData instanceof Function
      ? fetchData({store, match, adminAuth, adminDB, authUser, idToken, eventEmitter })
      : Promise.resolve(null)
  })
  eventEmitter.once(SSR_LOAD_COMPLETE, () => render(promises, store, routes, req, res, error))
})
const render = (promises, store, routes, req, res, error=false) => {
  return Promise.all(promises).then(data => {
      let context = {}
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      )

     res.render('index', { title: PROJECT_TITLE, data: store.getState(), content})
   })
}
module.exports = router
