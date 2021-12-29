//安装express模块 npm i express@4.17.1
//安装cors模块 npm i cors@2.8.5
/**
 *   安装生成 Token 字符串的包
 *   npm i jsonwebtoken@8.5.1
 *   安装解析 Token 的中间件：
 *   npm i express-jwt@5.3.3
 */
const expressJWT = require('express-jwt');
const config = require('./config');
//导入express
const express = require('express');
//创建服务器实例对象
const app = express();
const joi = require('joi');
//导入cors
const cors = require('cors');
app.use(cors());

//配置解析表单数据的中间件，只能解析application/x-www-form-urlencoded格式的表单
app.use(express.urlencoded({
    extended: false
}));
//************************************-返回客户端处理失败结果-********************************************

app.use((req, res, next) => {
    // status默认值为1，表示失败的情况
    // err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
})

//一定要在路由之前配置解析Token的中间件

app.use(expressJWT({
    secret: config.jwtSecretKet
}).unless({
    path: [/^\/api/]
}));

//************************************-导入路由模块-********************************************

//导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)

//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

//导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate');
app.use('/my/article', artCateRouter);

//************************************-错误级中间件-********************************************

//捕获验证失败的错误，并把验证失败的结果响应给客户端
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err);
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    // 未知错误
    res.cc(err)
})

//************************************-服务器启动-********************************************

//启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})