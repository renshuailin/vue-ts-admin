
<template>
  <div class="login">
    <app-LoginHeader>
      <el-form
        :rules="rule"
        :model="ruleForm"
        ref="ruleForm"
        label-position="left"
        label-width="0"
        slot="container"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button
            :loading="isLogin"
            @click.native.prevent="Submit"
            type="primary"
            style="width:100%"
          >登录</el-button>
        </el-form-item>
        <!--  7天 -->
        <el-form-item>
          <el-checkbox
            v-model="ruleForm.autoLogin"
            :checked="ruleForm.autoLogin"
            class="auto"
          >7天内自动登录</el-checkbox>
          <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码</el-button>
        </el-form-item>
        <span>测试号:laofuzi</span>
        <span>密 &nbsp;&nbsp;&nbsp;&nbsp;码:123456</span>
      </el-form>
    </app-LoginHeader>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
// 引入header
import LoginHeader from "components/LoginHeader/LoginHeader.vue";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
@Component({
  components: { "app-LoginHeader": LoginHeader },
})
export default class Login extends Vue {
  @Action("setUser") setUser: any;
  @Provide() isLogin: Boolean = false;
  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin: Boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true,
  };
  @Provide() rule = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  Submit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log("yes");
        this.isLogin = true;
        (this as any).$axios
          .post(`/api/users/login`, this.ruleForm)
          .then((res: any) => {
            console.log(res.data);
            this.isLogin = false;
            // 存储token
            localStorage.setItem("tsToken", res.data.token);
            // 存储vuex
            this.setUser(res.data.token);
            // 跳转首页
            this.$router.push("/");
          })
          .catch(() => {
            this.isLogin = false;
          });
      }
    });
  }
}
</script>

<style lang='scss' scoped>
.title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
i {
  font-size: 14px;
  margin-left: 8px;
}
.auto {
  float: left;
}
.forget {
  float: right;
}
span {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 5px;
  color: red;
  align-items: flex-start;
}
</style>