module.exports={
    outputDir:__dirname + '/../server/admin',  //控制生成到哪个文件夹
    publicPath:process.env.NODE_ENV==='production'
    ? '/admin'
    :'/'
}