<template>
  <el-scrollbar class="scrollbar">
    <el-menu class="menu" :default-active="$router.currentRoute.path" router>
      <template
        v-for="(item) in getRouters"
        v-if="item.hidden&&item.children&&item.children.length>0"
      >
        <el-menu-item
          v-if="item.children.length==1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name" default-openeds="[1]">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
import getters from "../../store/getters";
@Component({
  components: {}
})
export default class Sidebar extends Vue {
  @Getter("routers") getRouters: any;
  created() {
    // console.log(this.getRouters);
  }
  get ValA(){
            return ;
        }

}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .menu {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>