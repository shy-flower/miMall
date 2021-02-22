<template>
  <div class="detail">
    <!-- 吸顶 -->
    <div class="deta-top">
      <div class="deta-item">
        <div class="data-right">
          <span>小米cc9</span>
        </div>
        <div class="data-left">
          <a href="javascript:;">概述</a>
          <span>|</span>
          <a href="javascript:;">参数</a>
          <span>|</span>
          <a href="javascript:;">用户评价</a>
        </div>
      </div>
    </div>
    <!-- 主体页面,左右布局 -->
    <div class="detailPage">
      <!-- 左侧轮播 -->
      <div class="detailLeft">
        <!-- 轮播 -->
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item, index) in imgList" :key="index">
            <img :src="item.url" />
          </swiper-slide>
          <div class="swiper-pagination"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 右侧菜单 -->
      <div class="detailRight">
        <div class="title">
          <h1>{{ detaList.name }}</h1>
          <span
            >相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /
            骁龙845处理器 / 红 外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</span
          >
          <p class="business">
            商家自营
          </p>
          <div class="priceItem">
            <span class="price">{{ detaList.price }}元</span>
            <span class="originalPrice">1999元</span>
          </div>
        </div>
        <div class="location">
          <i class="icon-loc"></i>
          <div class="contenr">
            <div class="addr">
              北京 北京市 朝阳区 安定门街道
            </div>
            <div class="isStock">
              有现货
            </div>
          </div>
        </div>
        <div class="edition">
          <div class="title">
            <h2>
              选择版本
            </h2>
            <ul>
              <li :class="{ isEditionAfter: 1 === edition }" @click="handel(1)">
                6GB+64GB 全网通
              </li>
              <li :class="{ isEditionAfter: 2 === edition }" @click="handel(2)">
                4GB+64GB 移动4G
              </li>
            </ul>
          </div>
          <div class="color">
            <h2>
              选择颜色
            </h2>
            <ul>
              <li :class="{ isColorAfter: 3 === color }" @click="checked(3)">
                <div class="div1"></div>
                深灰色
              </li>
              <li :class="{ isColorAfter: 4 === color }" @click="checked(4)">
                <div class="div2"></div>
                粉红色
              </li>
            </ul>
          </div>
          <div class="productDetails">
            <div class="product-item">
              <div>小米CC9 6GB+64GB 全网通 深灰色</div>
              <div>{{ detaList.price }} 元</div>
            </div>
            <div class="total">总计: {{ detaList.price }}元</div>
          </div>
          <!-- 加入购物车 -->
          <el-button class="but" @click="toCart">加入购物车</el-button>
        </div>
      </div>
    </div>
    <!-- 价格说明 -->
    <div class="PriceDescription">
      <div class="PriceDescription-item">
        <div><h1>价格说明</h1></div>
        <div>
          <img src="http://mi.futurefe.com/imgs/detail/item-price.jpeg" />
        </div>
      </div>
    </div>
    <ServiceBar></ServiceBar>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "detail",
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
  },
  props: {},
  data() {
    return {
      id: this.$route.params.id, //获取商品id
      color: 0, //选择颜色
      swiperOptions: {
        autoplay: 3000,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickble: true,
        },
      },
      imgList: [
        {
          id: 1,
          url: "http://mi.futurefe.com/imgs/detail/phone-1.jpg",
        },
        {
          id: 2,
          url: "http://mi.futurefe.com/imgs/detail/phone-2.jpg",
        },
        {
          id: 3,
          url: "http://mi.futurefe.com/imgs/detail/phone-3.jpg",
        },
        {
          id: 4,
          url: "http://mi.futurefe.com/imgs/detail/phone-4.jpg",
        },
      ],
      detaList: {},
      edition: 0, //选择版本
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDetailDate();
  },
  mounted() {},
  methods: {
    getDetailDate() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) => {
        this.detaList = res;
        console.log(this.detaList);
      });
    },
    handel(id) {
      this.n = id;
      this.edition = id;
    },
    checked(id) {
      this.color = id;
    },
    toCart() {
      let loginLenght = this.$store.state.username;
      console.log(loginLenght.length);
      if (loginLenght.length == 0) {
        this.$router.replace("/login");
        this.$message.info("请先登录账户");
        return;
      }
      this.axios
        .post("/carts", {
          productId: this.id,
          selected: true,
        })
        .then((res = { cartProductVoList: 0 }) => {
          console.log(res);
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
          this.$router.push("/cart");
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/base.less";
@import "@/css/config.less";
@import "@/css/mixin.less";
.detail {
  .deta-top {
    .container();
    .deta-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 89px;
      line-height: 89px;
    }
    .data-right {
      font-size: 16px;
      height: 89px;
      line-height: 89px;
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .data-left {
      text-align: center;
      a {
        text-decoration: none;
        color: @colorC;
        font-size: 14px;
        margin-right: 6px;
      }
      span {
        letter-spacing: 6px;
        font-size: 14px;
      }
    }
  }
  .detailPage {
    .container();
    .detailLeft {
      width: 642px;
      height: 642px;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-pagination {
        background-color: red;
      }
    }
    .detailRight {
      width: 584px;
      .title {
        text-align: left;

        span {
          font-size: 14px;
        }
        .business {
          font-size: 16px;
          color: @colorA;
        }
        .priceItem {
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e5e5;
          .price {
            font-size: 18px;
            color: @colorA;
            margin-right: 10px;
          }
          .originalPrice {
            font-size: 16px;
            color: @colorD;
            text-decoration: line-through;
          }
        }
      }
      .location {
        width: 100%;
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        margin-top: 30px;
        font-size: 13px;
        color: @colorC;
        text-align: left;
        padding-left: 40px;
        .el-icon-location-outline:before {
          font-size: 22px;
          color: @colorC;
        }

        .icon-loc {
          width: 30px;
          height: 30px;
          display: inline-block;
          background-size: contain;
          background: url("http://mi.futurefe.com/imgs/detail/icon-loc.png")
            no-repeat center;
          background-size: 50%;
          position: relative;
          left: -10px;
          top: 30px;
        }
        .contenr {
          padding-left: 25px;
          .isStock {
            margin-top: 15px;
            font-size: 13px;
            color: @colorA;
          }
        }
      }
      .edition {
        .title {
          .isEditionBefore {
            border: 1px solid #e5e5e5;
            width: 280px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
            height: 50px;
            line-height: 50px;
            margin-left: 10px;
          }
        }

        .color {
          text-align: left;
          div {
            width: 15px;
            height: 15px;
            display: inline-block;
          }
          .div1 {
            background-color: #666666;
          }
          .div2 {
            background-color: pink;
          }
        }
        .isEditionAfter,
        .isColorAfter {
          border: 1px solid #ff6600;
          color: #ff6600;
          width: 280px;
          font-size: 16px;
          display: inline-block;
          text-align: center;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
        }

        h2 {
          font-size: 28px;
        }
        ul {
          list-style: none;
          padding: 0;
          li {
            border: 1px solid #e5e5e5;
            width: 280px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
            height: 50px;
            line-height: 50px;
            margin-left: 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .productDetails {
      width: 100%;
      background-color: #fafafa;
      padding: 24px 33px 29px 30px;
      font-size: 14px;

      .product-item {
        display: flex;
        justify-content: space-between;
      }
      .total {
        color: @colorA;
        font-size: 24px;
        text-align: left;
        margin-top: 20px;
      }
    }
    .but {
      position: relative;
      left: -24.5%;
      .themeButton(300px, 54px);
      border-radius: none;
      margin-top: 30px;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .PriceDescription {
      background-color: #f3f3f3;
    }
  }
  .PriceDescription {
    background-color: #f3f3f3;
    padding-bottom: 50px;

    .PriceDescription-item {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      text-align: left;
    }

    h1 {
      padding-top: 38px;
      padding-bottom: 20px;
    }
  }
}
</style>
