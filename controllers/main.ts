import * as Koa from 'koa'
import * as axios from 'axios'

export default {
  counter: (ctx: Koa.Context) => {
    ctx.res.statusCode = 200
    const n = ctx.session.count || 0
    ctx.session.count = n + 3
    console.log('count', ctx.session.count)
  },
  index: async (ctx: Koa.Context) => {
    await ctx.render('page/index')
  },
  oldStyle: (req, res, next) => {
    
  },
  axios: (ctx: Koa.Context) => {
    const p1 = new Promise((resolve, reject) => {
      const url = 'https://api.boolio.co.kr/v1/portfolios'
      const req1 = axios.get(url)
      const req2 = req1.then((response) => {
        ctx.body = response.data
        resolve()
      })
      const req3 = req2.catch((error) => {
        reject(error)
      });
    })
    
    return p1
  },
  'axios2': async (ctx: Koa.Context) => {
    const url = 'https://api.boolio.co.kr/v1/portfolios'
    const api = await axios.get(url)
    ctx.body = api.data
  },
  axios3: (ctx: Koa.Context) => {
    const url = 'https://api.boolio.co.kr/v1/portfolios'
    const req1 = axios.get(url)
    const p = req1.then(response => {
      ctx.body = response.data
    })
   return p
  }
}
