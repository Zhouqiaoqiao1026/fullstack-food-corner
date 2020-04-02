module.exports=options=>{
    const jwt=require('jsonwebtoken')
    const assert=require('http-assert')
    const Admin=require('../models/Admin')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop() //获取请求头
        assert(token, 401, '请先登录') 
        const { id } = jwt.verify(token, req.app.get('secret')) //通过token解析得到用户名的id
        assert(id, 401, '请先登录')   
        req.user = await Admin.findById(id)  //通过id查找用户对象
        assert(req.user, 401, '请先登录')
        await next()
      }
}