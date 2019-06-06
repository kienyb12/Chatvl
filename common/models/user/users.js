'use strict';

module.exports = function (User) {
    // User.instance.createTokenForExternalApp = async function (cb) {
    //     console.log('authencation');
    //     this.accessTokens.create({
    //         ttl: -1,
    //         scopes: ['read:profile'],
    //     }, cb);
    // };
    //send verification email after registration
    User.afterRemote('create', function (context, user, next) {
        var options = {
            type: 'email',
            to: user.email,
            from: senderAddress,
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/verified',
            user: user
        }
    });
    User.Login = async function () {
        try {
            return [200, 'success', ""]
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
};