<template>
  <div class="layout">
    <!-- 头部 -->
    <app-LayoutHeader />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
//header
import LayoutHeader from "components/LayoutHeader/LayoutHeader.vue";

@Component({
  components: { "app-LayoutHeader": LayoutHeader }
})
export default class Layout extends Vue {}
</script>

<style lang='scss' scoped>
</style>