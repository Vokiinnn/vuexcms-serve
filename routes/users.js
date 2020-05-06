var express = require('express');
var router = express.Router();
var userController = require('../userController/user.js')
const {connection} = require('../until/config.js')

//连接数据库
connection.connect((err) => {
  if(err){
    console.log('数据库连接失败！')
  }else{
    console.log('数据库连接成功！')
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('连接成功');
});
router.post('/getuserlist',userController.getuserlist)
router.post('/checklogin',userController.checklogin)
router.post('/userdel',userController.userdel)
router.get('/verify',userController.verify)


router.post('/register',userController.register)


module.exports = router;
