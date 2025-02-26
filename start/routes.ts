/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductController = () => import('#controllers/product_controller')
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/Auth/session_controller')

router.get('/', [HomeController])

router
  .group(() => {
    router.get('/', [ProductController, 'index'])
    router.get('/:id', [ProductController, 'show'])
  })
  .prefix('/products')

router
  .group(() => {
    router.get('login', [SessionController, 'showLogin'])
    router.post('login', [SessionController, 'login'])
    router.get('register', [SessionController, 'showRegister'])
    router.post('register', [SessionController, 'register'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/logout', [SessionController, 'logout'])
  })
  .use(middleware.auth())
