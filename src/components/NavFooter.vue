/* 底部导航栏 */
<template>
  <div class="footer">
    <div class="footer-log">
      <img src="http://mi.futurefe.com/imgs/logo-footer.png" alt="小米logo" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://www.baidu.com/">百度首页 | </a>
      <a href="https://coding.imooc.com/class/113.html">Vue全栈课程 | </a>
      <a href="https://coding.imooc.com/class/343.html">React全家桶课程 | </a>
      <a href="https://coding.imooc.com/class/343.html">微信支付专项课程 | </a>
      <a href="https://coding.imooc.com/class/392.html"
        >配套课程:java通用型支付+电商平台双系统实战</a
      >
    </div>
    <div class="Copyright">
      <span>Copyright ©2020 </span>
      <span>mi.futurefe.com </span>
      <span>All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
@import "@/css/config.less";

.footer {
  border-top: 4px solid @colorA;
  background-color: #333;
  text-align: center;
  height: 234px;
  font-size: 16px;
  color: #999;

  .footer-log {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      display: inline-block;
      text-decoration: none;
      color: #999;
    }
    margin-bottom: 6px;
  }
  .Copyright {
    span:nth-child(2) {
      color: @colorA;
    }
  }
}
</style>
