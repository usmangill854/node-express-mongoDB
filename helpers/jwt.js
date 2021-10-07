const expressJwt = require('express-jwt')

function authJwt(){
    const secret = process.env.secret
    const api =process.env.API_URL
    return expressJwt({
        secret,
        algorithms:['HS256']
    }).unless({
        path:[
            {url: /\/api\/v1\/products(.*)/,method : ['GET' , 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/,method : ['GET' , 'OPTIONS']},
             `${api}/users/register` ,
            `${api}/users/login`,

        ]
    })
}

module.exports = authJwt