import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductController = () => import('#controllers/product_controller')
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/Auth/session_controller')
const CartController = () => import('#controllers/cart_controller')

router.get('/', [HomeController])

router
  .group(() => {
    router.get('/', [ProductController, 'index'])
    router.get('/:id', [ProductController, 'show'])
  })
  .prefix('/products')

router
  .group(() => {
    router.get('/', [CartController, 'index'])
    router.post('/', [CartController, 'store'])
    router.put('/:id', [CartController, 'update'])
    router.delete('/:id', [CartController, 'destroy'])
    router.delete('/', [CartController, 'clear'])
  })
  .prefix('/cart')

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
