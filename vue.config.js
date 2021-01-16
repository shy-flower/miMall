module.exports = {
  lintOnSave: false,
  devServer:{
    host:'localhost',
    proxy:{
      '/api':{
        target:'',
        pathRewrite:{
          '/api':''
        }
      }
    }


  }
}