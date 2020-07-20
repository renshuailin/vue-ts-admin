<template>
  <div class="header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="info">
          <img class="logo" src="@/assets/logo.png" alt />
          <span>老夫子管理系统</span>
        </div>
      </el-col>
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-dropdown class="user">
          <span class="inner">
            <img :src="require('@/assets/'+ getUser.key+'.jpg')" alt />
            {{getUser.username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
@Component({
  components: {}
})
export default class LayoutHeader extends Vue {
  @Getter("user") getUser: any;
  created() {
    console.log(this.getUser);
  }
}
</script>

<style lang='scss' scoped>
.header {
  background-color: #496060;
  line-height: 64px;
  height: 64px;
}
</style>