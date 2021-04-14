<template>
  <div class="index">
    <div class="order_title">
      <div class="content">
        <div class="order-header">
          <div class="one">
            <div class="header-logo">
              <!-- logo -->
              <a href="/#/index"></a>
              <!-- home -->
            </div>
            <span>{{ title }}</span>
            <slot name="tip" class="tipClass"></slot>
          </div>
          <div class="tow">{{ this.$store.state.username }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-header",
  components: {},
  props: {
    title: String,
  },
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
@import "@/css/base.less";
.index {
  .order_title {
    width: 100%;
    border-bottom: 2px solid @colorA;
  }
  .content {
    .container();
    .order-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 55px;
      line-height: 55px;
      padding: 30px 0 30px 0;
      .one {
        display: flex;
        justify-content: space-between;

        span:nth-child(2) {
          font-size: 28px;
          font-weight: bold;
          margin-right: 10px;
        }
      
      }
      .tow {
        font-size: 16px;
        color: #666;
      }
      .header-logo {
        display: inline-block;
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
    }
  }
}
</style>
