<template>
  <div class="index1">
    <div class="index">
      <div class="container">
        <div class="carousel-box">
          <div class="nav-menu">
            <ul class="menu-wrap">
              <li class="menu-item">
                <a href="javascript:;" class="menuA">手机 电话卡</a>
                <div class="children">
                  <ul v-for="(item, index) in menuList" :key="index">
                    <li v-for="(sub, index) in item" :key="index">
                      <a :href="sub ? '/#/product/' + sub.id : ''">
                        <img
                          v-lazy="
                            sub.img ||
                              'http://mi.futurefe.com/imgs/item-box-1.png'
                          "
                        />
                        {{ sub ? sub.name : "小米cc9" }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">电视 盒子</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">笔记本 平板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">家电 插线板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">出行 穿戴</a>
              </li>

              <li class="menu-item">
                <a href="javascript:;" class="menuA">智能 路由器</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">电源 配件</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;" class="menuA">生活 箱包</a>
              </li>
            </ul>
          </div>
          <el-carousel trigger="click" height="451px">
            <el-carousel-item
              v-for="(item, index) in carouselList"
              :key="index"
            >
              <a :href="'/#/product/' + item.id">
                <img v-lazy="item.img" />
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          :key="index"
        >
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="#/product/30">
          <img v-lazy="'http://mi.futurefe.com/imgs/banner-1.png'" />
        </a>
      </div>
    </div>
    <div class="phone">
      <div class="product-box">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img src="http://mi.futurefe.com/imgs/mix-alpha.jpg" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(item1, index) in phoneList" :key="index">
              <div class="item" v-for="(item2, j) in item1" :key="j">
                <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img">
                  <img v-lazy="item2.mainImage" alt="" />
                </div>
                <div class="item-inifo">
                  <h3>{{ item2.name }}</h3>
                  <p>{{ item2.subtitle }}</p>
                  <p class="price" @click="addCart(item2.id)">
                    {{ item2.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServiceBar></ServiceBar>
    <!--  添加购物车对话框-->
    <div class="dialogCart">
      <el-dialog title="提示" :visible.sync="Shopping_CartDialog" width="50%">
        <p>商品添加成功!</p>
        <span slot="footer" class="dialog-footer">
          <div class="btn">
            <el-button type="primary" @click="Shopping_CartDialog = false">
              <a href="javascript:;">查看购物车</a>
            </el-button>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar.vue";

export default {
  name: "index",

  data() {
    return {
      carouselList: [
        { id: "42", img: "http://mi.futurefe.com/imgs/slider/slide-1.jpg" },
        { id: "45", img: "http://mi.futurefe.com/imgs/slider/slide-2.jpg" },
        { id: "46", img: "http://mi.futurefe.com/imgs/slider/slide-3.jpg" },
        { id: "42", img: "http://mi.futurefe.com/imgs/slider/slide-4.jpg" },
        { id: "42", img: "http://mi.futurefe.com/imgs/slider/slide-1.jpg" },
      ],
      menuList: [
        [
          {
            id: 30,
            img: "http://mi.futurefe.com/imgs/item-box-1.png",
            name: "小米cc9",
          },
          {
            id: 31,
            img: "http://mi.futurefe.com/imgs/item-box-2.png",
            name: "小米8青春版",
          },
          {
            id: 32,
            img: "http://mi.futurefe.com/imgs/item-box-3.jpg",
            name: "RdemiK20",
          },
          {
            id: 33,
            img: "http://mi.futurefe.com/imgs/item-box-4.jpg",
            name: "移动数据专区",
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        { id: 33, img: "http://mi.futurefe.com/imgs/ads/ads-1.png" },
        { id: 48, img: "http://mi.futurefe.com/imgs/ads/ads-2.jpg" },
        { id: 45, img: "http://mi.futurefe.com/imgs/ads/ads-3.png" },
        { id: 47, img: "http://mi.futurefe.com/imgs/ads/ads-4.jpg" },
      ],
      phoneList: [],
      Shopping_CartDialog: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  components: {
    ServiceBar,
  },
  mounted() {
    //加载商品列表
    this.init();
  },
  methods: {
    async init() {
      const data = await this.axios.get("/products", {
        params: {
          categoryId: 100012,
          pageSize: 8,
        },
      });
      this.phoneList = [data.list.slice(0, 4), data.list.slice(4, 8)];
    },
    /* 添加购物车 */
    addCart(id) {
      this.axios.get("/carts").then((res) => {
        if (res.fail != 10) {
          this.Shopping_CartDialog = true;
          this.$router.push("/#/cart", {
            params: {
              categoryId: id,
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/mixin.less";
.index {
  text-align: center;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  .container {
    display: flex;
    justify-content: center;
    img {
      width: 1226px;
      height: 451px;
    }
    a {
      display: inline-block;
    }
    .carousel-box {
      width: 1226px;
      height: 451px;
    }
    .carousel-box {
      .nav-menu {
        box-sizing: border-box;
        position: absolute;
        z-index: 10;
        width: 264px;
        height: 451px;
        padding: 26px 0;
        background-color: #55585a6b;
        font-size: 16px;
        text-align: left;
        .el-carousel__arrow--left {
          left: 280px !important;
        }

        .menu-wrap {
          .menu-item {
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            .menuA {
              text-decoration: none;
              font-size: 16px;
              color: #ffffff;
              position: relative;
              display: block;
              &:after {
                content: "";
                position: absolute;
                right: 30px;
                top: 17.5px;
                .bgImg(
                  10px,
                  15px,
                  "http://mi.futurefe.com/imgs/icon-arrow.png",
                  15px
                );
              }
            }

            &:hover {
              background-color: #ff6600;
              .children {
                display: block;
              }
            }
            .children {
              display: none;
              width: 962px;
              height: 451px;
              background-color: #ffffff;
              position: absolute;
              top: 0;
              border: 1px solid #e5e5e5;
              margin-left: 235px;
              img {
                width: 42px;
                height: 35px;
              }

              ul {
                display: flex;
                justify-content: space-between;
                height: 75px;
                li {
                  height: 75px;
                  line-height: 75px;
                  width: 241px;
                  padding-left: 23px;
                }
                a {
                  text-decoration: none;
                  color: #333333;
                  height: 75px;
                  line-height: 75px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
        ul {
          padding-left: 0;
        }
        li {
          list-style: none;
        }
      }
    }
  }
  .ads-box {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      display: inline-block;
      width: 296px;
      height: 167px;
    }
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .banner {
    margin-bottom: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.phone {
  background-color: #f5f5f5;
  .product-box {
    width: 1226px;
    text-align: center;
    margin: auto;
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 50px;
    h2 {
      width: 45px;
      height: 21px;
      line-height: 21px;
      font-size: 22px;
      color: #333333;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      a {
        display: block;
      }
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          width: 986px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .item {
          width: 236px;
          height: 302px;
          background-color: #ffffff;
          text-align: center;
          position: relative;

          span {
            width: 67px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            font-size: 14px;
            color: #ffffff;
            &.new-pro {
              background-color: #7ecf68;
            }
            &.kill-pro {
              background-color: #f20a0a;
            }
          }
          .item-img {
            img {
              height: 160px;
              width: 190px;
            }
          }
          .item-inifo {
            h3 {
              color: #333333;
              font-size: 14px;
              line-height: 14px;
              font-weight: bold;
            }
            p {
              color: #999999;
              line-height: 13px;
              margin: 6px auto 13px;
            }
            .price {
              color: #f20a0a;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              &::after {
                content: " ";
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("http://mi.futurefe.com/imgs/icon-cart-hover.png")
                  no-repeat center;
                background-size: 22px;
                margin-left: 5px;
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
}
.dialogCart {
  p {
    font-size: 18px;
    padding-left: 25px;
  }
  .btn {
    text-align: center;
    height: 82px;
    line-height: 82px;
    .el-button--primary {
      background-color: #ff6600 !important;
      border: none;
      width: 110px;
      height: 40px;
      text-align: center;
      a {
        display: inline-block;
        text-decoration: none;
        color: #ffffff;
      }
    }
  }
}
</style>
<style></style>
