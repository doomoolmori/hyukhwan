const users = {
  '1': 'alvin',
  '2': 'jisoo'
}

const ps = {
  '1': 'soonhanmat',
  '2': 'yakganmaeunmat',
  '3': 'maeunmat'
}


const OldDatabase = {

  findUserById: (id, cb) => {
    const user = users[id];
    if ( ! user) cb(new Error("No user found"))
    else cb(null, user);
  },

  findPortfolioById: (id, cb) => {
    const p = ps[id];
    if ( ! p) cb(new Error("No portfolio found"))
    else cb(null, p);
  }
}

const PromiseDatabase = {

  findUserById: (id) => {
    let p = new Promise((resolve, reject) => {
      const user = users[id];
      if ( ! user) reject(new Error("No user found"))
      else resolve(user);  
    });
    return p;
  },

  findPortfolioById: (id) => {
    return new Promise((resolve, reject) => {
      const p = ps[id];
      if ( ! p) reject(new Error("No portfolio found"))
      else resolve(p);  
    })
  }
}

const AsyncDatabase = {

  findUserById: async (id) => {
    const user = users[id];
    if ( ! user) throw new Error("No user found")
    else return user
  },

  findPortfolioById: async (id) => {
    const p = ps[id];
    if ( ! p) throw new Error("No portfolio found")
    else return p
  }
}


export default {

  expressExampleOld: (req, res, next) => {
    OldDatabase.findUserById(req.query.userId, (err, user) => {
      if (err) next(err)
      else {
        OldDatabase.findPortfolioById(req.query.portfolioId, (err, portfolio) => {
          if (err) next (err)
          else res.render('someView', {user, portfolio})
        })
      }
    })
  },

  expressExamplePromise: (req, res, next) => {
    let promise = new Promise((resolve, reject) => {
      PromiseDatabase.findUserById(req.query.userId)
        .then(user => {
          let p1 = PromiseDatabase.findPortfolioById(req.query.portfolioId)
          let p2 = p1.then(portfolio => {
            let result = {user, portfolio}
            resolve(result)
          })
          return p2
        })
        .catch(reject)
    })
    promise
      .then(result => res.render('someView', result))
      .catch(next)
  },

  expressExaamleAsync: (req, res, next) => {
    let run = async () => {
      let user = await PromiseDatabase.findPortfolioById(req.query.userId)
      let p = await PromiseDatabase.findPortfolioById(req.query.portfolioId)
      return {user, p}

    }
    run()
      .then(result => res.render('someView', result))
      .catch(next)
  },

  koaExample: async (ctx: Koa.Context) => {
    let user = await AsyncDatabase.findPortfolioById(req.query.userId)
    let p = await AsyncDatabase.findPortfolioById(req.query.portfolioId)
    ctx.render('someView', {user, p})
  },