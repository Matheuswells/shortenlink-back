import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  public async signup({ request, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    const fullNameRegex = /^[a-zA-Z\s]+$/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!fullNameRegex.test(fullName)) {
      return response.badRequest({ message: 'Invalid full name format' })
    }

    if (!emailRegex.test(email)) {
      return response.badRequest({ message: 'Invalid email format' })
    }

    if (!passwordRegex.test(password)) {
      return response.badRequest({ message: 'Invalid password format' })
    }

    const user = await User.create({ fullName, email, password })
    return response.created(user)
  }

  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).firstOrFail()

    if (!(await hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await auth.use('api').authenticateAsClient(user)

    return response.ok({ token })
  }
}
