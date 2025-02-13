import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { Roles } from '#enum/Role'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'admin@example.fr',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      role: Roles.ADMIN,
    })
  }
}