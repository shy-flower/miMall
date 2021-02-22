<template>
  <div>
    <Product-Param></Product-Param>
    <div class="product">
      <div class="proMessage">
        <h2>
          {{ this.$store.state.product.name }}
        </h2>
        <h3>{{ this.$store.state.product.subtitle }}</h3>
        <a href="javascript:;">全球首款双频 GP</a>
        <span>|</span>
        <a href="javascript:;">骁龙845</a>
        <span>|</span>
        <a href="javascript:;">AI变焦双摄</a>
        <span>|</span>
        <a href="javascript:;">红外人脸识别</a>
        <h1>¥{{ this.$store.state.product.price }}元</h1>
      </div>
    </div>
    <div class="content">
      <div class="pro-item"></div>
      <div class="pro-item2"></div>
      <div class="pro-item3">
        <swiper width="455px" :options="swiperOptions">
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <img :src="item.img" />
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="item-video">
      <h2>
        60帧超慢动作摄影<br />
        慢慢回味每一瞬间的精彩
      </h2>
      <span
        >后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br />更能AI
        精准分析视频内容，15个场景智能匹配背景音效。
      </span>
      <div class="video-bg" @click="ClickVideo">
        <img src="http://mi.futurefe.com/imgs/product/gallery-1.png" />
      </div>
      <div class="video-box">
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="video"></div>
      </div>
    </div>
    <!-- 视频弹框 -->
    <el-dialog
      :visible.sync="videoDialogVisible"
      class="videoDialog"
      width="1000px"
    >
      <video
        src="http://mi.futurefe.com/imgs/product/video.mp4"
        autoplay
        controls="controls"
      ></video>
    </el-dialog>
  </div>
</template>

<script>
import ProductParam from "@/components/ProductParam.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "product",
  components: {
    ProductParam,
    swiper,
    swiperSlide,
  },
  props: {},
  data() {
    return {
      showSlide: "", //控制动画效果
      swiperOptions: {
        loop: true,
        autoplay: 5000,
        effect: true,
        Slide: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMod: true,

        pagination: {
          el: ".swiper-pagination",
          clickble: true,
        },
      },

      swiperList: [
        { id: 1, img: "http://mi.futurefe.com/imgs/product/gallery-1.png" },
        { id: 2, img: "http://mi.futurefe.com/imgs/product/gallery-2.png" },
        { id: 3, img: "http://mi.futurefe.com/imgs/product/gallery-3.png" },
        { id: 4, img: "http://mi.futurefe.com/imgs/product/gallery-4.png" },
        { id: 5, img: "http://mi.futurefe.com/imgs/product/gallery-5.jpg" },
      ],
      videoDialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  reated() {},
  mounted() {},
  created() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id; //通过route.params获取到路由参数,id
      this.axios.get(`/products/${id}`).then((res) => {
        console.log(res);

        this.$store.dispatch("getProductList", res);
      });
    },
    ClickVideo() {
      this.videoDialogVisible = true;
    },
  },
};
</script>

<style lang="less">
@import "@/css/globle.less";
@import "@/css/mixin.less";
@import "@/css/base.less";
@import "@/css/config.less";

.product {
  height: 718px;
  background: url("http://mi.futurefe.com/imgs/product/product-bg-1.png")
    no-repeat center;
  text-align: center;
  .proMessage {
    padding-top: 55px;

    h2 {
      font-size: 80px;
      color: #333333;
      margin-block-start: 0;
      margin-block-end: 0;
    }
    h3 {
      font-size: 24px;
      letter-spacing: 10px;
      color: #333333;
    }
    a,
    span {
      color: #333333;
      text-decoration: none;
      font-size: 16px;
      font-weight: 50;
      margin-right: 15px;
    }
    h1 {
      font-size: 40px;
    }
  }
}
.content {
  /* .container(); */
  .pro-item {
    height: 480px;
    background: url("http://mi.futurefe.com/imgs/product/product-bg-2.png")
      no-repeat center;
    background-size: 1226px 397px;
  }
  .pro-item2 {
    height: 638px;
    background: url("http://mi.futurefe.com/imgs/product/product-bg-3.png")
      no-repeat center;
    background-size: cover;
  }
  .pro-item3 {
    overflow: hidden;
    height: 300px;
    .swiper-box {
      width: 455px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.item-video {
  background-color: black;
  text-align: center;
  h2 {
    font-size: 60px;
    color: #ffffff;
  }
  span {
    color: #ffffff;
    font-size: 24px;
  }
  .video-bg {
    .container();
    height: 540px;
    margin-top: 58px;
    .el-dialog__header {
      padding: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.videoDialog {
  video {
    width: 100%;
    height: 100%;
  }
  span {
    margin-top: 17px;
    z-index: 200px;
  }
  .el-icon-close:before {
    font-size: 25px;
    position: absolute;
    left: 110%;
    margin-top: 27px;
  }
}
/* 清除对话框默认样式 */
.el-dialog__header,
.el-dialog__body {
  padding: 0 !important;
}
</style>
