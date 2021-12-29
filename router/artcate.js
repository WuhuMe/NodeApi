const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const {
    add_cate_schema,
    delete_cate_schema
} = require('../schema/artcates');

const artcate_handler = require('../router_handler/artcate');

router.post('/cates', artcate_handler.getArticleCates);
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates);
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById);


module.exports = router;