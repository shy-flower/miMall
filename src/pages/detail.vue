<template>
  <div class="detail">
    <!-- 吸顶 -->
    <div class="deta-top">
      <div class="deta-item">
        <div class="data-right">
          <h1>小米9</h1>
        </div>
        <div class="data-left">
          <h2>概述|参数|用户评价</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
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
    }
    .data-right {
      font-size: 16px;
    }
    .data-left {
      text-align: center;
    }
  }
}
</style>
