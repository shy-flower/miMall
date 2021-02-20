//商城vuex-action
export default{
    saveUserName(contetx,username){
        contetx.commit('saveUserName',username)
    },
    saveCartCount(contetx,count){
        contetx.commit('saveCartCount',count)
    },
    getProductList(contetx,count){
        contetx.commit('getProductList',count)

    }

}