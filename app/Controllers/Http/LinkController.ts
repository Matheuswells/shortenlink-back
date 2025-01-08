import { HttpContext } from '@adonisjs/core/http'
import Link from '#models/link'

export default class LinkController {
  public async store({ auth, request, response }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const data: any = request.only(['original'])

      let isUnique = false
      while (!isUnique) {
        data.short = Math.random().toString(36).substring(2, 7)
        const existingLink = await Link.findBy('short', data.short)
        if (!existingLink) {
          isUnique = true
        }
      }

      data.owner = user.id
      const link = await Link.create(data)
      return response.created(link)
    } catch (error) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
  }

  public async index({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const links = await Link.all()
      return response.ok(links)
    } catch (error) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
  }

  public async show({ auth, params, response }: HttpContext) {
    try {
      await auth.authenticate()
      const link = await Link.findOrFail(params.id)
      return response.ok(link)
    } catch (error) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
  }

  public async update({ auth, params, request, response }: HttpContext) {
    try {
      await auth.authenticate()
      const link = await Link.findOrFail(params.id)
      const data = request.only(['original', 'short', 'accessCounter'])
      link.merge(data)
      await link.save()
      return response.ok(link)
    } catch (error) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
  }

  public async destroy({ auth, params, response }: HttpContext) {
    try {
      await auth.authenticate()
      const link = await Link.findOrFail(params.id)
      await link.delete()
      return response.noContent()
    } catch (error) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
  }
}
