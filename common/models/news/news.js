'use strict';
module.exports = function (News) {
    News.getListNews = async  (page, size) => {
        try {
            let article = await News.find({
                where: {        
                },
                limit: size,
                skip: (page-1) * size
            })
            return [200, 'success', article]
        } catch (e) {
            console.log(e);
            return [400, 'fail', e]
        }
    }
    News.remoteMethod(
        'getListNews',
        {
            http: { verb: 'get' },
            accepts: [
                {arg: 'page', type: 'number', required: true, default: 1},
                {arg: 'size', type: 'number', required: true, default: 10}
            ],
            returns: [
                { arg: 'code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'string' }
            ]
        }
    );

    News.postNews = async  (title, content) => {
        try {
            let article = await News.create({
                title,
                content,
                publishedAt: Math.floor(Date.now()/1000)
            })
            return [200, 'success', article]
        } catch (e) {
            console.log(e);
            return [400, 'fail', e]
        }
    }
    News.remoteMethod(
        'postNews',
        {
            http: { path: '/add', verb: 'post' },
            accepts: [
                {arg: 'title', type: 'string', required: true},
                {arg: 'content', type: 'string', required: true}
            ],
            returns: [
                { arg: 'code', type: 'number' },
                { arg: 'message', type: 'string' },
                { arg: 'data', type: 'string' }
            ]
        }
    );
};