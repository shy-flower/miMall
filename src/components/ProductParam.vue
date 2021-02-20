<template>
  <div class="proParam">
    <div class="nav-bar " :class="{ is_fixed: isFixed }">
      <div class="content">
        <div class="pro-title">
          <h1>{{ this.$store.state.product.name }}</h1>
        </div>
        <div class="pro-param">
          <a hreF="JavaScript:;">概述</a>
          <span>|</span>
          <a href="JavaScript:;">参数</a>
          <span>|</span>
          <a href="JavaScript:;">用户评价</a>
          <el-button class="themeBtn" @click="goDetail()">立即购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductParam",
  props: {},
  components: {},
  props: {},
  data() {
    return {
      isFixed: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      /*    console.log(window.pageYOffset);
      console.log(document.documentElement.scrollTop); */
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    },
    goDetail() {
      let id = this.$route.params.id; //通过route.params获取到路由参数,id
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/base.less";
@import "@/css/config.less";
@import "@/css/globle.less";
@import "@/css/mixin.less";
.proParam {
  .nav-bar {
    width: 100%;
    border-top: 1px solid #dadce0;
    background-color: #ffffff;
    &.is_fixed {
      position: fixed;
      top: 0;
    }
    .content {
      .container();
      height: 70px;
      line-height: 70px;
      background-color: #ffffff;
      .pro-title {
        span {
          font-weight: bold;
          font-size: 18px;
        }
      }
      .pro-param {
        a,
        span {
          text-decoration: none;
          color: @colorC;
          font-size: 14px;
          margin-right: 13px;
        }
        .themeBtn {
          .themeButton(110px, 30px);
        }
      }
    }
  }
}
</style>
