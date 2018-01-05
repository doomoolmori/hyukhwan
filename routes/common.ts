import * as Router from 'koa-router'
import mainControllers from '../controllers/main'

const router = new Router()

router.get('/', mainControllers.index)
router.get('/counter', mainControllers.counter)
router.get('/axios', mainControllers.axios)
router.get('/axios2', mainControllers.axios2)
router.get('/axios3', mainControllers.axios3)

const routes = router.routes()

export default routes
