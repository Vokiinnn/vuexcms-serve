let mysql = require("mysql");
let nodemailer = require('nodemailer')

//数据库配置
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "vuexcms"
} )

//邮箱配置
let Email = {
    config:{
        host: "smtp.qq.com",
        port: 587,
        secure: false, 
        auth: {
          user: '2015944220@qq.com', 
          pass:'bvtmqiwaskwoefja' 
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config)
    },
    get verify(){
        return Math.random().toString().substring(2,6)
    }
}


module.exports = {
    connection,
    Email
}
