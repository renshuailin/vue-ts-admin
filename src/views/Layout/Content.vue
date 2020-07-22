<template>
  <el-container class="content">
    <!-- left -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>
    <!-- right -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <el-breadcrumb separator=">" class="breadcrumb">
          <el-breadcrumb-item
            v-for="(item,index) in breadCrumbItems"
            :key="index"
            :to="{ path: item.path }"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容 -->
      <div class="context">
        <slot name="context"></slot>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Content extends Vue {
  @Provide() breadCrumbItems: any; // 面包屑的数组
  @Watch("$route") Change(to: any) {
    // console.log(this.$route);

    this.initBreadCrumbItems(to);
  }
  created() {
    this.initBreadCrumbItems(this.$route);
  }
  initBreadCrumbItems(router: any) {
    // console.log(router);
    let breadCrumbItems = [
      {
        path: "/",
        title: "管理系统"
      }
    ];
    for (const item in router.matched) {
      if (router.matched[item].meta && router.matched[item].meta.title) {
        breadCrumbItems.push({
          path: router.matched[item].path ? router.matched[item].path : "/",
          title: router.matched[item].meta.title
        });
      }
    }
    this.breadCrumbItems = breadCrumbItems;
    // console.log(this.breadCrumbItems);
  }
}
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    overflow: hidden;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      // overflow: hidden;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .context {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>