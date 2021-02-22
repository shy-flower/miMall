/* 头部导航栏 */
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="outLogin()">退出</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" @click="goToCart" class="my-cart">
            <span class="icon-cart"></span>
            我的购物车({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <!-- logo -->
          <a href="/#/index"></a>
          <!-- home -->
        </div>
        <div class="header-menu">
          <!-- 小米手机 -->
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img ">
                      <img :src="item.mainImage" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">¥:{{ item.price }}元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- redmi红米 -->
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <!-- 电视 -->
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-1.jpg"
                      />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">8999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-2.jpg"
                      />
                    </div>
                    <div class="pro-name">小米全面电视 E55A</div>
                    <div class="pro-price">1889</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-3.png"
                      />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">2999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-4.jpg"
                      />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">3999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-5.jpg"
                      />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">5699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        class="lastImg"
                        src="http://mi.futurefe.com/imgs/nav-img/nav-3-6.png"
                      />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">5693元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-hearder",
  components: {},
  props: {},
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
  watch: {},
  created() {
    this.getProductList();
  },
  mounted() {},
  methods: {
    login() {
      this.$router.push("/login");
    },

    async getProductList() {
      const res = await this.axios.get("/products", {
        params: {
          categoryId: "100012",
          pageSize: 6,
        },
      });
      this.phoneList = res.list.slice(0, 6);
    },
    goToCart() {
      this.$router.push("/cart");
    },
    //实现退出功能
    outLogin() {
      // 分析: 1.点击退出,出现登录字样,购物车数量清0
      this.$store.dispatch("saveCartCount", 0); //清空购物车
      this.$store.dispatch("saveUserName", ""); //登录状态设为未登录
      this.$message.success("退出成功");
      return;
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/base.less";
@import "@/css/mixin.less";
@import "@/css/config.less";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
    a {
      display: inline-block;
      color: #b0b0b0;
      margin-right: 17px;
      text-decoration: none;
    }
    .my-cart {
      width: 110px;
      background: #ff6600;
      color: #ffffff;
      text-align: center;
      margin-right: 0px;
      .icon-cart {
        .bgImg(
          16px,
          12px,
          "http://mi.futurefe.com/imgs/icon-cart-checked.png",
          contain
        );
      }
    }
  }
}
.nav-header {
  text-align: center;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;

  .container {
    width: 1226px;
    display: flex;
    align-items: center;
  }
  .header-logo {
    display: flex;
    width: 110px;
    height: 55px;
    a:nth-child(1) {
      display: inline-block;
      width: 55px;
      height: 55px;
      text-align: center;
      background: url("http://mi.futurefe.com/imgs/mi-logo.png");
      background-color: #ff6600;
    }
  }
  .header-menu {
    width: 643px;
    padding-left: 209px;
    .item-menu {
      width: auto;

      display: inline-block;
      color: #333333;
      font-weight: bold;
      font-size: 16px;
      line-height: 112px;
      margin-right: 20px;
      span {
        cursor: pointer;
      }
      &:hover {
        color: @colorA;
        .children {
          height: 220px;
          opacity: 1;
        }
      }
      .children {
        width: 1226px;
        position: absolute;
        top: 112px;
        left: 149px;
        height: 0;
        opacity: 0;
        border-top: 1px solid @colorH;
        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
        z-index: 10;
        background-color: @colorG;
        overflow: hidden;
        transition: height 0.5s;

        ul li {
          display: inline-block;
        }
      }
      .product {
        position: relative;
        float: left;
        width: 16.6%;
        height: 220px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;

        a {
          text-decoration: none;
          display: inline-block;
        }

        .pro-name {
          font-weight: bold;
          margin-top: 19px;
          margin-bottom: 8px;
          color: @colorB;
        }
        .pro-price {
          color: @colorA;
        }
        img {
          width: auto;
          margin-top: 26px;
          height: 111px;
          border-right: 1px solid @colorF;
        }
        .lastImg {
          border-right: none;
        }
      }
    }
  }
  .header-search {
    width: 319px;
    .wrapper {
      height: 48px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
    input {
      border: none;
      border: 1px solid #e0e0e0;
      width: 264px;
      height: 50px;
      padding-left: 14px;
      box-sizing: border-box;
    }
    a {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url("http://mi.futurefe.com/imgs/icon-search.png") no-repeat
        center;
      background-size: 18px;
      line-height: 18px;
      padding-left: 35px;
    }
  }
}
</style>
