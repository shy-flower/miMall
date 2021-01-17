<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
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
    this.axios.get("/mock/user/login.json").then((res) => {
      this.res = res;
    });
  },
  methods: {},
};
</script>

<style></style>
