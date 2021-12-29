const express = require('express');
const router = express.Router();


const expressJoi = require('@escook/express-joi');
const {
    update_userinfo_schema
} = require('../schema/user');


const userInfo_handler = require('../router_handler/userinfo');
//挂载路由
//获取用户基本信息
router.get('/userinfo', userInfo_handler.getUserinfo);
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfo_handler.updateUserInfo);



module.exports = router;