import AppRoot from './app'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Products from './pages/products'
import Product from './pages/product'

const routes = [
	{
		component: AppRoot,
		routes: [
			{
				path: '/',
				exact: true,
				component: Home
			},
			{
				path: '/login',
				component: Login
			},
			{
				path: '/register',
				component: Register
			},
			{
				path: '/products',
				component: Products,
			},
			{
				path: '/product/:id',
				component: Product,
			},
			{
				path: '*',
				component: Home
			}
		]
	}
]

export default routes
