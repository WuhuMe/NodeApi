const db = require('../db/index');


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