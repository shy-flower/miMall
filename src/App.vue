<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import "@/css/reset.css";
import "@/css/config.less";

/* import storage from "@/storage/index.js";
 */ export default {
  name: "app",
  components: {},
  props: {},
  data() {
    return {
      res: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getUser();
    this.getCartCount();
    /*  this.axios.get("/mock/user/login.json").then((res) => {
      this.res = res;
    }); */
  },
  methods: {
    //获取用户信息
    async getUser() {
      const res = await this.axios.get("/user");
      /* 
      .then((res) => {
        this.$store.dispatch("saveUserName", res.username);
        console.log("获取用户信息");
        //保存到vuex里面
      }); */
    },
    //购物车商品数据的总和
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res) => {
        //保存到vuex里面
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style></style>
