let { Email } = require("../until/config.js");
let { connection } = require("../until/config.js");



//检查用户登录
let checklogin = async (req, res, next) => {
  let { username, password } = req.body.param;
  //执行sql查询
  const sqlStr = `select * from manager where username ='${username}' and password ='${password}'`;
  connection.query(sqlStr, function (err, data) {
    if (err) {
      throw err
    } else {
      res.send(data);
    }
  });
};


//获取用户数据
let getuserlist = async (req, res, next) => {
  let { start, end } = req.body;
  let sqlStr = "";
  const sqlStrLimit = `select id,username,realname from users order by id asc limit ${start},${end}`;
  const sqlStrNull = `select id,username,realname from users order by id asc`;
  if (start && end) {
    sqlStr = sqlStrLimit;
  } else {
    sqlStr = sqlStrNull;
  }


  //返回结果给前端
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
};
//数据删除
let userdel = async (req, res, next) => {
  let id = req.body.id;
  // console.log(req.body)
  // res.send('1')
  const sqlStr = `delete from users where id = '${id}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send("1");
    }
  });
};

//用户注册
let register = (req,res,next) => {
  let {username,password,email,verify} = req.body
  if(email !== req.session.email || verify !== req.session.verify){
    res.send({
      msg:'验证码错误',
      status:-1
    })
    
  }else{
    const sqlStr = `insert into manager(username,password,email)values('${username}','${password}','${email}')`
    connection.query(sqlStr,(err,data) => {
      if(err){
        throw err
      }else{
        res.send({
          msg:'注册成功',
          status:0
        })
      }
    })
  }

}

//发送验证码
let verify = (req, res, next) => {
  let email = req.query.email;
  let verify = Email.verify;
  req.session.verify = verify;
  req.session.email = email;
  let mailOption = {
    from: "wokin 2015944220@qq.com",
    to: email,
    subject: "wokin网站  邮箱验证码",
    text: "验证码：" + verify,
  };

  Email.transporter.sendMail(mailOption, (err) => {
    if (err) {
      res.send({
        msg: "验证码发送失败，请检查邮箱或稍后再试",
        status: -1,
      });
    } else {
      res.send({
        msg: "验证码发送成功",
        status: 0,
      });
    }
  });
};

module.exports = {
  checklogin,
  getuserlist,
  userdel,
  verify,
  register
};
