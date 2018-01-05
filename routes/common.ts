import * as Router from 'koa-router'
import mainControllers from '../controllers/main'

const router = new Router()

router.get('/a', async (ctx, next) => {
  await ctx.render('promise/a')
})
router.get('/c', async (ctx, next) => {
  await ctx.render('promise/c')
})
router.get('/p', async (ctx, next) => {
  await ctx.render('promise/p')
})
router.get('/p-s', async (ctx, next) => {
  await ctx.render('promise/p-s')
})
router.get('/all', async (ctx, next) => {
  await ctx.render('promise/all')
})
router.get('/counter', mainControllers.counter)
router.get('/axios', mainControllers.axios)
router.get('/axios2', mainControllers.axios2)
router.get('/axios3', mainControllers.axios3)

const routes = router.routes()

export default routes
