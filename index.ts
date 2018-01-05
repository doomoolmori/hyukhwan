import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as nunjucks from 'koa-nunjucks-2'
import * as bodyParser from 'koa-bodyparser'
import * as path from 'path'
import * as session from 'koa-session'
import * as staticFiles from 'koa-static'
import routes from './routes/common'
import * as redis from 'koa-redis'
import * as axios from 'axios'

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.port || '3000');
const sessionConfig = {
  key: 'hi:hello',
  maxAge: 3600000,
  store: new redis({
    host: '127.0.0.1',
    port: 6379,
  })
}
app.keys = ['avjkecdeee$54(676!3cvref']

app.use(logger())
app.use(session(sessionConfig, app))
app.use(nunjucks({
  ext: 'njk',
  path: path.join(__dirname, 'views'),
}));
app.use(bodyParser())
app.use(staticFiles(path.resolve(__dirname, './public')))
app.use(routes)
app.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}\n`)
})
