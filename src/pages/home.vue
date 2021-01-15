<template>
  <div>
    <nav-hearder></nav-hearder>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter.vue";
export default {
  name: "home",
  components: { NavFooter },
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

<style scoped lang="less"></style>
