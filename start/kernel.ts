import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

server.errorHandler(() => import('../app/exceptions/handler.js'))

server.use([
  () => import('../app/middleware/container_bindings_middleware.js'),
  () => import('../app/middleware/force_json_response_middleware.js'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
])

export const middleware = router.named({
  auth: () => import('../app/middleware/auth_middleware.js'),
})
