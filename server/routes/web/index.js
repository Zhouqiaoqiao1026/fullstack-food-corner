module.exports=app=>{
    const router=require('express').Router()
    const jwt=require('jsonwebtoken')
    const assert=require('http-assert')
    const Ad=require('../../models/Ad')
    const Article=require('../../models/Article')
    const Category=require('../../models/Category')
    const Menu=require('../../models/Menu')
    const User=require('../../models/User')
     //广告轮播图接口
    router.get('/ad/list',async(req,res)=>{
        const ads=await Ad.find().lean()
        res.send(ads)
    })
    //文章列表接口
    router.get('/article/list',async(req,res)=>{
        const atcs=await Article.find().lean()
        res.send(atcs)
    })
    //分类列表接口
    router.get('/category/list',async(req,res)=>{   //一级分类
        const cats=await Category.where({
            parent:null
          }).lean()
        res.send(cats)
    })
    router.get('/category/list/:id',async(req,res)=>{  //二级分类
        const pa=await Category.findById(req.params.id)
        const cats=await Category.where({
            parent:pa
          }).lean()
        res.send(cats)
    })
    router.get('/category',async(req,res)=>{  //二级分类
        const cat=await Category.find().lean()
        res.send(cat)
    })
    router.get('/category/:id',async(req,res)=>{  //二级分类
        const cat=await Category.findById(req.params.id).lean()
        res.send(cat)
    })

    //菜谱列表接口
    router.get('/menu/list',async(req,res)=>{
        const menus=await Menu.find().lean()
        res.send(menus)
    })
    router.get('/menu/list/:id',async(req,res)=>{
        const pa=await Category.findById(req.params.id)
        const menus=await Menu.where({
            parent:pa._id
          }).lean()
        res.send(menus)
    })
    //菜谱详情接口
    router.get('/menu/detail/:id',async(req,res)=>{
        const menus=await Menu.findById(req.params.id).lean()
        res.send(menus)
    })
    //文章详情接口
   router.get('/article/detail/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    res.send(data)
  })
  //用户注册接口
  router.post('/register',async(req,res)=>{
    const model=await User.create(req.body)
    res.send(model)
})
//const authMiddleware=require('../../middleware/auth')  //auth中间件


    /******************************图片上传接口*******************************/
    const multer=require('multer')
    const upload =multer({dest:__dirname+'/../../uploads'})
    app.post('/web/api/upload',upload.single('file'),async(req,res)=>{
    const file=req.file;
    file.url=`http://foodcorner.bol4.top/uploads/${file.filename}`
    res.send(file);
})

app.post('/web/api/login',async(req,res)=>{
    const {username,password}=req.body  //解构赋值
    //1.根据用户名找用户
    const user=await User.findOne({username}).select('+password')
    assert(user,422,'用户不存在') //确保用户存在
    //2.校验密码
    const isValid=require('bcryptjs').compareSync(password,user.password)
    assert(isValid,422,'密码错误')//确保密码正确
    //3.返回token
    const token=jwt.sign({id:user._id},app.get('secret'))   //生成token 给密钥secret防止客户端篡改信息
    res.send({token})  //发送token给客户端
})

//错误处理函数
app.use(async(err,req,res,next)=>{
    res.status(err.statusCode || 500).send({
        message:err.message
    })
})
    app.use('/web/api', router)
}