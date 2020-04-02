const express=require("express")
const app=express()
app.set('secret','sfu9879ipergk')  //密钥
app.use(express.json())
app.use(require('cors')())

app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/web', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin')) //静态文件托管

require('./routes/admin')(app)
require('./routes/web')(app)
require('./db/db')(app)

app.listen(3001,()=>{
    console.log('http://localhost:3001')
});
