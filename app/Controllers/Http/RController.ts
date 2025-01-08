import { HttpContext } from '@adonisjs/core/http'
import Link from '#models/link'

export default class RController {
  public async redirect({ params, response }: HttpContext) {
    const link = await Link.findByOrFail('short', params.short)
    link.accessCounter += 1
    await link.save()
    return response.redirect(link.original)
  }
}
