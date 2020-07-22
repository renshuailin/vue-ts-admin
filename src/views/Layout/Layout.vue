<template>
  <div class="layout">
    <!-- 头部 -->
    <app-LayoutHeader />
    <!-- 内容 -->
    <app-Content>
      <app-Sidebar slot="left" />
      <router-view slot="context"></router-view>
    </app-Content>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
//header
import LayoutHeader from "components/LayoutHeader/LayoutHeader.vue";
// 内容
import Content from "./Content.vue";
import Sidebar from "./Sidebar.vue";

@Component({
  components: {
    "app-LayoutHeader": LayoutHeader,
    "app-Content": Content,
    "app-Sidebar": Sidebar
  }
})
export default class Layout extends Vue {}
</script>

<style lang='scss' scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
.app-Content {
  height: 100%;
}
</style>