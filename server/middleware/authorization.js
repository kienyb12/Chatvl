'use strict';

const jwt = require('jsonwebtoken');
let LoopBackContext = require('loopback-context');
module.exports = function() {
  return async(req, res, next) => {
    let ctx = LoopBackContext.getCurrentContext()
    
    let token = req.headers['authorization']
    if (!token) {
      return next(new Error('Invalid token'))
    }
    
    token = token.replace('Bearer ', '')
    const data = jwt.verify(token, 'test')
    if (!data) {
      return next(new Error('Invalid token or expired'))
    }
   
    // ctx.set('user', {
    //   id: data.data.id,
    //   email: data.data.email
    // })
    return next()
  }
}
