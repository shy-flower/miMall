import Mock from 'mockjs'
Mock.mock('/api/user/login',{
        "status": 0 ,
        "data" : {
            "id":12,
            "username":"admin",
            "email" : "admin@51purse.com",
            "phone" : null,
            "role":0,
            "createTime":1479048325000,
            "updateTime":1479048325000
        }
    
    
}) //第一个参数是请求地址,第二个参数是返回值