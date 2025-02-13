import { Roles } from '#enum/Role'
import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).maxLength(100),
    lastName: vine.string().minLength(3).maxLength(100),    
    email: vine
      .string()
      .email()
      .unique(async (db,value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/).confirmed(),
    password_confirmation: vine.string().minLength(8).maxLength(32),
    role: vine.enum(Object.values(Roles))
  })
)