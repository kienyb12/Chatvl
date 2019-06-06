'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (User) {
    User.Login = async (email, password) => {
        try {
            let user = await User.findOne({
              where: {
                email: email
              },
              fields: ['password', 'email', 'id']
            });
            if(!user) return [400, 'invalid email', '']
            if(!bcrypt.compareSync(password, user.password)){
              return [400, 'invalid password', '']
            }
          let claims = {
            id: user.id,
            email: user.email
          };
            console.log(claims);
  
          let ttl =  86400; // 1h as default
  
          let token = await jwt.sign({
            data: claims,
          }, 'test', {
            expiresIn: ttl,
          });
            return [200, 'success', {token}]
        } catch (e) {
            console.log(e);
            return [400, 'fail', e]
        }
    }
    User.remoteMethod(
        'Login',
        {
            http: { path: '/login', verb: 'post' },
            accepts: [
                { arg: 'email', type: 'string', required: true },
                { arg: 'password', type: 'string', required: true },
            ],
            returns: [
                { arg: 'code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'string' }
            ]
        }
    );
  User.Register = async (name, email, password)=>{
    try {
      let userAddInstance = {
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        createdAt: Math.floor(Date.now() / 1000)
      }
      await User.upsert(userAddInstance)
      delete userAddInstance.password
      return [200, 'success',userAddInstance]
    } catch (e) {
      console.log(e);
      return [400, 'fail', e]
    }
  }
  User.remoteMethod(
    'Register',
    {
      http: { path: '/register', verb: 'post' },
      accepts: [
        { arg: 'name', type: 'string', required: true },
        { arg: 'email', type: 'string', required: true },
        { arg: 'password', type: 'string', required: true },
      ],
      returns: [
        { arg: 'code', type: 'number' },
        { arg: 'message', type: 'string' },
        { arg: 'data', type: 'string' }
      ]
    }
  );
};
