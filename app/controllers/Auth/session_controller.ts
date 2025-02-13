import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/Auth/login'
import { registerValidator } from '#validators/Auth/register'

export default class SessionController {
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('Auth/Login')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user, !!request.input('remember_me'))
      session.flash({ success: 'You are logged in.' })

      return response.redirect('/')
    } catch (errors) {
      console.error('Login error:', errors)
      session.flash({ errors: 'Incorrect credentials.' })

      return response.redirect('/login')
    }
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('Auth/Register')
  }

  async register({ request, auth, response, session }: HttpContext) {
    const { email, password, password_confirmation, firstName, lastName } = await request.validateUsing(registerValidator);
    try {
      const user = await User.create({ email, password, firstName, lastName });
      await auth.use('web').login(user);
      session.flash({ success: 'You are registered and logged in.' });
      return response.redirect('/');
    } catch (errors) {
      console.error('Register error:', errors);
      session.flash({ errors: 'There was a problem registering your account.' });
      return response.redirect('/register');
    }
  }
  
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash({ success: 'You have been logged out.' })
    return response.redirect('/')
  }
}