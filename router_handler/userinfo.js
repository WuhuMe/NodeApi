const db = require('../db/index');
//导入bcryptjs，验证表单
const bcrypt = require('bcryptjs');

//************************************-获取用户基本信息-********************************
exports.getUserinfo = (req, res) => {
    //查询用户sql语句
    const sql = `select id,username,nickname,email,user_pic from user where id=?`;
    //db.query()执行sql
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败!');

        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0],
        })
    })
}
//************************************-更新用户信息-************************************
exports.updateUserInfo = (req, res) => {
    //更新用户信息sql
    console.log(req.body);
    console.log(req.user.id);
    const sql = `update user set ? where id=?`;
    db.query(sql, [req.body, req.user.id], (err, results) => {
        console.log(results);
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败');
        res.cc('修改用户信息成功', 0);

    });


}
//************************************-更新密码-****************************************
exports.updatePassword = (req, res) => {
    const sql = `select * from user where id=?`;
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在');
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('原密码错误');
        //加密新密码
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        //更新密码sql
        const sql1 = `update user set password=? where id=?`;
        db.query(sql1, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新密码失败');
            res.cc('更新密码成功', 0);
        })
    })


}
//************************************-更新用户头像-*************************************
exports.updateAvatar = (req, res) => {
    const sql = `update user set user_pic=? where id=?`;
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新头像失败');
        returnres.cc('更新头像成功', 0);
    })
}