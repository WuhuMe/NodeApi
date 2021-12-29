/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
/**
 *     导入密码加密模块 npm i bcryptjs@2.4.3
 *     加密之后的密码，无法被逆向破解
 *     同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
 */


//导入jsonwebtoken包,生成Token
const jwt = require('jsonwebtoken');
const config = require('../config');
//导入bcryptjs，验证表单
const bcrypt = require('bcryptjs');

//导入数据库操作模块
const db = require('../db/index');

//************************************-注册用户处理-****************************************
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的信息
    const userinfo = req.body;
    //对表单数据进行合法性校验
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({
    //     //     status: 1,
    //     //     message: '用户名或密码不合法!',
    //     // })
    //     return res.cc('用户名或密码不合法!');
    // }

    //定义sql语句查询用户名是否被占用
    const sqlStr = 'select * from user where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message,
            // });
            return res.cc(err);
        }
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用，请更换其他用户名！'
            // });
            return res.cc('用户名被占用，请更换其他用户名！');
        }

        //用户名可以使用
        //调用bcrypt.handSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        console.log(userinfo);
        //插入新用户
        const sql = `insert into user set ?`;
        const user = {
            username: userinfo.username,
            password: userinfo.password
        };
        db.query(sql, user, (err, results) => {
            if (err) {
                // return res.send({
                //     status: 1,
                //     message: err,
                // });
                return res.cc(err);
            }
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册用户失败，请稍后再试'
                // })
                return res.cc('注册用户失败，请稍后再试');
            }
            //注册用户成功
            // res.send({
            //     status: 0,
            //     message: '注册用户成功',
            // })
            res.cc('注册用户成功', 0)
        })

    })

    console.log(userinfo);

}

//************************************-登陆处理-********************************************
exports.login = (req, res) => {
    const userinfo = req.body;
    const sql = `select * from user where username=?`;
    db.query(sql, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err);
        //执行sql成功但是获取到的数据条数不等于1
        if (results.length !== 1) return res.cc('登陆失败，请确认用户名');
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) {
            return res.cc('密码错误，登陆失败');
        }
        //在服务器端生成Token的字符串
        console.log(results);
        const user = {
            ...results[0],
            password: '',
            user_pic: '',
        }
        //对用户信息进行加密，生成Token字串
        const tokenStr = jwt.sign(user, config.jwtSecretKet, {
            expiresIn: config.expiresIn
        });
        //调用res.send()将Token响应给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr,
        })
    })

}