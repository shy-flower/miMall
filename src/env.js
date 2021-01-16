//统一管理不同的环境分发不同的baseURL地址
// dev 开发环境
// test 测试环境
// autotest 测试开发环境
// prod 生产环境


let baseURl;
switch(process.env.NODE_ENV){
    case 'development':
        baseURl='http://dev-mall-pre.springboot.cn/api';
        break
    case 'test':
        baseURl='http://test-mall-pre.springboot.cn/api';
        break
    case 'prod':
        baseURl='http://mall-pre.springboot.cn/api';
        break
        default:
            baseURl ='http://mall-pre.springboot.cn/api';
            break

}



export default {
    baseURl
}