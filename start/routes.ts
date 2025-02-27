import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductController = () => import('#controllers/product_controller')
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/Auth/session_controller')
const CartController = () => import('#controllers/cart_controller')
const CheckoutController = () => import('#controllers/checkout_controller')

router.get('/', [HomeController]).as('home')

router
  .group(() => {
    router.get('/', [ProductController, 'index']).as('products.index')
    router.get('/:id', [ProductController, 'show']).as('products.show')
  })
  .prefix('/products')

router
  .group(() => {
    router.get('/', [CartController, 'index']).as('cart.index')
    router.post('/', [CartController, 'store']).as('cart.store')
    router.put('/:id', [CartController, 'update']).as('cart.update')
    router.delete('/:id', [CartController, 'destroy']).as('cart.destroy')
    router.delete('/', [CartController, 'clear']).as('cart.clear')
  })
  .prefix('/cart')

router
  .group(() => {
    router.get('/', [CheckoutController, 'index']).as('checkout.index')
    router.post('/address', [CheckoutController, 'updateAddress']).as('checkout.updateAddress')
    router.post('/process', [CheckoutController, 'processOrder']).as('checkout.process')
    router
      .get('/confirmation/:id', [CheckoutController, 'confirmation'])
      .as('checkout.confirmation')
  })
  .prefix('/checkout')
  .use(middleware.auth())

router
  .group(() => {
    router.get('login', [SessionController, 'showLogin']).as('auth.login')
    router.post('login', [SessionController, 'login']).as('auth.login.store')
    router.get('register', [SessionController, 'showRegister']).as('auth.register')
    router.post('register', [SessionController, 'register']).as('auth.register.store')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/logout', [SessionController, 'logout']).as('auth.logout')
  })
  .use(middleware.auth())
