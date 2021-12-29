/**
 *  单纯的使用 if...else... 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。因此，使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性
 *  1. 安装joi 包，为表单中携带的每个数据项，定义验证规则
 *  npm i joi
 *  2. 安装 @escook/express-joi 中间件，来实现自动对表单数据进行验证的功能：
 *  npm i @escook/express-joi
 */

//导入定义验证规则的包
const joi = require('joi');


/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
//************************************-用户登陆-********************************************
//定义用户名和密码的验证规则
// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}
//************************************-用户更新-********************************************
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

exports.update_userinfo_schema = {
    body: {

        nickname,
        email,
    }
}