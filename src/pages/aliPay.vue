<template>
  <div>
    <!-- 正在做支付宝付款页面 -->
    <div class="ali-Pay">
      <loading v-if="loading"></loading>
      <div class="form" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import Loading from "@/pages/loading.vue";

export default {
  name: "aliPay",
  components: {
    Loading,
  },
  props: {},
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: "",
      loading: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderId, //
          orderName: "Vue高仿小米商城", //扫码支付时订单名称
          amount: 0.01, //单位元
          payType: 1, //1.支付宝 2.微信
        })
        .then((res) => {
          this.content = res.content;
          setTimeout(() => {
            document.forms[0].submit();
          }, 100);
        });
    },
  },
};
</script>

<style
  scoped
  lang="less
"
></style>
