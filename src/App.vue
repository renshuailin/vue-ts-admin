<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
@Component({
  components: {}
})
export default class App extends Vue {
  @Action("setUser") setUser: any;
  created() {
    this.setUser(localStorage.tsToken);
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
