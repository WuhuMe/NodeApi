const express = require('express');
const router = express.Router();


const expressJoi = require('@escook/express-joi');
const {
    update_userinfo_schema,
    update_password_schema,
    update_avatar_schema,
} = require('../schema/user');


const userInfo_handler = require('../router_handler/userinfo');
//挂载路由
//获取用户基本信息
router.get('/userinfo', userInfo_handler.getUserinfo);
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfo_handler.updateUserInfo); //更新用户信息路由
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword);
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo_handler.updateAvatar);



module.exports = router;