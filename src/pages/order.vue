<template>
  <div class="Order">
    <router-view></router-view>
    <ServiceBar></ServiceBar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import ServiceBar from "@/components/ServiceBar.vue";

export default {
  name: "order",
  components: { NavFooter, OrderHeader, ServiceBar },
  props: {},
  data() {
    return {
      title: "", //头部名称
      tip: "", //头部辅助信息
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    //根据路由地址按需显示头部路由信息
    // 1.先获取当前路由地址
    let path = this.$route.path;
    if (path == "/order/confirm") {
      this.title = "订单确认";
      this.tip = "请认真填写收货地址";
    } else if (path == "/order/pay") {
      this.title = "订单支付";
      this.tip = "请谨防钓鱼链接或诈骗电话，了解更多";
    } else {
      this.title = "订单支付";
      this.tip = "请谨防钓鱼链接或诈骗电话，了解更多";
    }
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
