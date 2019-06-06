'use strict';

const jwt = require('jsonwebtoken');
let LoopBackContext = require('loopback-context');
module.exports = function() {
  return async(req, res, next) => {
    let ctx = LoopBackContext.getCurrentContext()
    let err = new Error();
    let token = req.headers['authorization']
    if (!token) {
      err.message = 'Token not exists';
      return next(err)
    }
    
    token = token.replace('Bearer ', '')
    let data = null
    try {
      data = await jwt.verify(token, 'test')
    }catch (e) {
      err.message = 'Token not exists';
      return next(err)
    }
    
    if (!data) {
      err.message = 'Invalid token or expired';
      return next(err)
    }
    await ctx.set('user', {
      id: data.data.id,
      email: data.data.email
    })
    return next()
  }
}
