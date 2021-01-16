<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import storage from "@/storage/index.js";
export default {
  name: "app",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // storage.setItem('a',1) 往user对象内添加了一个key:a,value:1
    // storage.setItem('user',{a:1})  //覆盖了旧的user,形成新的user,内含a:1
    //  storage.setItem('abc',{b:1},'user') //往user里面添加了一个abc键值对
    // storage.clear("a", "user");
  },
  methods: {},
};
</script>

<style></style>
