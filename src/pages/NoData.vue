<template>
  <div class="no-data">
    <img src="@/img/pk.jpg" />
    <p>当前暂无提交的订单记录</p>
  </div>
</template>

<script>
export default {
  name: "no-data",
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
.no-data {
  text-align: center;
  font-size: 20px;
  color: #99999999;
  margin: 50px 0;
  img {
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
}
</style>
