import router from '@adonisjs/core/services/router'
import UserController from '../app/Controllers/Http/UserController.js'
import LinkController from '../app/Controllers/Http/LinkController.js'
import RController from '../app/Controllers/Http/RController.js'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/signup', new UserController().signup)
router.post('/login', new UserController().login)

router
  .group(() => {
    router.get('/links', new LinkController().index)
    router.post('/links', new LinkController().store)
    router.get('/links/:id', new LinkController().show)
    router.put('/links/:id', new LinkController().update)
    router.delete('/links/:id', new LinkController().destroy)
  })
  .use(middleware.auth())

router.get('/r/:short', new RController().redirect)
