const { defineConfig } = require("@vue/cli-service");
const target = 'http://localhost:8000'



module.exports = defineConfig({
  devServer:{
    proxy:{
      '/api':{
        target,
        //changeOrigin: true//cross origin 허용
      },
      
    }
  }
  
});

