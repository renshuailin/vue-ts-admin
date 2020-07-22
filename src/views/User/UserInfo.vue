<template>
  <div class="user-info">
    <div class="box">
      <h2 class="title">about me</h2>
      <img :src="require('@/assets/'+getUser.key+'.jpg')" />
      <h4>{{getUser.username}}</h4>
    </div>
    <div class="info">
      <h2 class="title">Account</h2>
      <!-- form -->
      <el-form :model="userData" class="form-box">
        <el-form-item label="用户名">
          <el-input v-model="getUser.username" readonly :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userData.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="Submit"
            :disabled="!userData.pwd"
            type="primary"
            :loading="loading"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  @Provide() userData: { username: String; pwd: String } = {
    username: "",
    pwd: ""
  };

  @Provide() loading: boolean = false;
  @Getter("user") getUser: any;
  created() {
    // console.log(this.getUser);
  }
  Submit() {
    // console.log(this.userData);
    this.userData.username = this.getUser.username;
    this.loading = true;
    // 请求
    (this as any).$axios
      .post(`/api/users/changePwd`, this.userData)
      .then((res: any) => {
        console.log(res.data);
        this.loading = false;

        this.$message({
          message: res.data.msg,
          type: "success"
        });
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .box,
  .info {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info {
    flex: 1;
    .form-box {
      padding: 10px;
    }
  }
}
</style>