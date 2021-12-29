const {
    result
} = require('@hapi/joi/lib/base');
const db = require('../db/index');


//************************************-获取文章分类-****************************************
exports.getArticleCates = (req, res) => {
    const sql = `select * from article where is_delete=0 order by id asc`;
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '文章分类列表获取成功',
            data: results,
        })
    })
}
//************************************-更新文章分类-****************************************
exports.addArticleCates = (req, res) => {
    // 定义分类别名与分类名称是否被占用的SQL语句
    const sql = 'select * from article where name=? or alias=?';
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        //分类名称和分类别名都被占用
        if (results.length === 2) return res.cc('分类与别名被占用，请更换后重试');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类与别名被占用,请更换后重试');
        //分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用,请更换后重试');
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用,请更换后重试');

        //else新增文章分类
        const insertSql = `insert into article set ?`;
        db.query(insertSql, req.body, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('新增文章列表失败');
            res.cc('新增文章列表成功', 0);
        })


    })
}
//************************************-删除文章分类-****************************************
exports.deleteCateById = (req, res) => {
    const sql = `update article set is_delete=1 where id=?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败');
        res.cc('删除文章分类成功', 0);
    })
}