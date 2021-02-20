module.exports = {
  lintOnSave: false,
  devServer:{
    host:'localhost',
    port:8087,
    proxy:{
      '/api':{
        target:'http://mi.futurefe.com/api/',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }


  }
}