const joi = require('joi');

//定义分类名和分类别名校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

//************************************-校验规则对象————添加分类-****************************************
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}
//************************************- 定义 分类Id 的校验规则-****************************************
const id = joi.number().integer().min(1).required();
exports.delete_cate_schema = {
    params: {
        id,
    },
}