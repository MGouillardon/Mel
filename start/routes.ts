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
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/Auth/session_controller')

router.get('/', [HomeController])

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
