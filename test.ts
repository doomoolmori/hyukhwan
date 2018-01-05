const users = {
  '1': 'alvin',
  '2': 'jisoo'
}

const ps = {
  '1': 'soonhanmat',
  '2': 'yakganmaeunmat',
  '3': 'maeunmat'
}
// 단순 콜백
const OldDatabase = {
  findUserById: function (id, cb) { // id를 파라미터로, cb라는 콜백함수도 파라미터로
    const user = users[id]; // users에 파라미터 id로 해당 value를 얻은 다음 user에 담그기
    if ( ! user) cb(new Error("No user found")) // cb에 err 타입을 담음 
    else cb(null, user); //cb에 파라미터 2개를 넣음, 앞에는 null, 뒤에는 user
  },

  findPortfolioById: function(id, cb) {
    const p = ps[id];
    if ( ! p) cb(new Error("No portfolio found"))
    else cb(null, p);
  }
}
expressExampleOld: (req, res, next) => {
  let cb2 = function (err, user){ // 앞에는 id, 뒤에는 cb에 넘겨줄 2개 파라미터
    if (err) next(err) // 위에 cb에서 err를 리턴하면 
    else { 
      OldDatabase.findPortfolioById(req.query.portfolioId, (err, portfolio) => {
        if (err) next (err)
        else res.render('someView', {user, portfolio})
      })
    }
  }
  OldDatabase.findUserById(req.query.userId, cb2)
},

// 프러미스
const PromiseDatabase = {
  findUserById: (id) => {
    let p = new Promise((resolve, reject) => { //프러미스 객채 생성
      const user = users[id];
      if ( ! user) reject(new Error("No user found")) // 프러미스 상태 변환
      else resolve(user);  // 프러미스 상태 변환
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
expressExamplePromise: (req, res, next) => {
  console.log('ho');
  let promise = new Promise((resolve, reject) => { //또 새로운 프로미스 인스턴스 생성
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
  promise //새로운 프러미스 인스턴스의 
    .then(result => res.render('someView', result))
    .catch(next)
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

expressExampleAsync: (req, res, next) => {
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