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
import { userStatus, SSR_LOAD_COMPLETE } from '../client/state/actions/users'
import express from 'express'
import routes from '../client/routes'
const router = express.Router()
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)))
import Cookies from 'universal-cookie'
import events from 'events'
import {adminAuth, adminDB} from './firebaseInit'
const eventEmitter = new events.EventEmitter()

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url)
  const promises = branch.map(({ route, match }) => {
    let fetchData = route.component.fetchData
    const cookies = new Cookies(req.cookies)
    const authUser = cookies.get('authUser')
    const idToken = cookies.get('idToken')
    userStatus(authUser)(store.dispatch)
    return fetchData instanceof Function
      ? fetchData({store, match, adminAuth, adminDB, authUser, idToken, eventEmitter })
      : Promise.resolve(null)
  })
  eventEmitter.once(SSR_LOAD_COMPLETE, () => render(promises, store, routes, req, res))
})
const render = (promises, store, routes, req, res) => {
  return Promise.all(promises).then(data => {
      let context = {}
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      )
     let pageStatus = true
     if(context.status === 404) {
        res.status(404);
        pageStatus = false
     }
     res.render('index', { title: PROJECT_TITLE, data: store.getState(), content, pageStatus })
   })
}
module.exports = router
