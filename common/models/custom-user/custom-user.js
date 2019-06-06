'use strict';

module.exports = function (CustomUser) {
    CustomUser.getListCustomuser = async (page, size) => {
        try {
            let customuser = await CustomUser.find({
                where: {
                },
                limit: size,
                skip: (page - 1) * size
            })
            return [200, 'success', customuser]
        } catch (e) {
            console.log(e);
            return [400, 'fail', e]
        }
    }
    CustomUser.remoteMethod(
        'getListCustomuser',
        {
            http: { verb: 'get' },
            accepts: [
                { arg: 'page', type: 'number', required: true, default: 1 },
                { arg: 'size', type: 'number', required: true, default: 10 }
            ],
            returns: [
                { arg: 'code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'string' }
            ]
        }
    );

    CustomUser.postCustomuser = async (name) => {
        try {
            let customuser = await CustomUser.create({
                name,
                publishedAt: Math.floor(Date.now() / 1000)
            })
            return [200, 'success', customuser]
        } catch (e) {
            console.log(e);
            return [400, 'fail', e]
        }
    }
    CustomUser.remoteMethod(
        'postCustomuser',
        {
            http: { path: '/add', verb: 'post' },
            accepts: [
                { arg: 'name', type: 'string', required: true }
            ],
            returns: [
                { arg: 'code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'string' }
            ]
        }
    );
};
