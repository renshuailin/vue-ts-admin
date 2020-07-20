
<template>
  <div>
    <app-LoginHeader>
      <el-form
        slot="container"
        :model="ruleForm"
        :rules="rule"
        ref="ruleForm"
        label-position="left"
        label-width="0"
      >
        <div class="title">
          <h3>找回密码</h3>
        </div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input type="email" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱">
            <i slot="prefix" class="fa fa-envelope-o"></i>
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
      </el-form>
    </app-LoginHeader>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
// 引入header
import LoginHeader from "components/LoginHeader/LoginHeader.vue";
@Component({
  components: { "app-LoginHeader": LoginHeader }
})
export default class Password extends Vue {
  @Provide() isLogin: Boolean = false;

  @Provide() ruleForm: {
    username: String;
    email: String;
  } = {
    username: "",
    email: ""
  };
  @Provide() rule = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "blur,change"
      }
    ]
  };
  Submit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        this.isLogin = true;
        (this as any).$axios
          .post(`/api/users/findPwd`, this.ruleForm)
          .then((res: any) => {
            // console.log(res.data);
            this.isLogin = false;
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.$router.push("/login");
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
</style>