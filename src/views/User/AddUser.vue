<template>
  <el-dialog
    title="新增账户"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form :rules="rule" ref="rule" :model="account" class="form-box" label-width="100px">
      <el-form-item label="请选择角色" prop="role">
        <el-select @change="select" v-model="account.role">
          <el-option v-for="item in data" :label="item.role" :value="item.role" :key="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入账号" prop="username">
        <el-input v-model="account.username" placeholder="请输入账号名称"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button @click="confirm" type="primary" :loading="isLogin">确定</el-button>
    </span>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Provide, Prop, Emit } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AddUser extends Vue {
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) data!: any;
  @Provide() isLogin: Boolean = false;
  @Provide() rule: any = {
    username: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
    role: [{ required: true, message: "请选择商品等级", trigger: "change" }],
  };
  @Provide() account: Object = {
    key: "",
    role: "",
    des: "",
    username: "",
  };
  @Emit()
  select(select: string) {
    this.data.map((item: any) => {
      if (item.role == select) {
        (this as any).account.key = item.key;
        (this as any).account.des = item.des;
      }
    });
  }
  confirm() {
    // console.log(this.account);
    (this as any).$refs["rule"].validate((valid: boolean) => {
      if (valid) {
        this.isLogin = true;
        (this as any).$axios
          .post(`/api/users/addUser`, this.account)
          .then((res: any) => {
            this.isLogin = false;
            this.$emit("close");
            this.$emit("update");
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          });
      }
    });
  }
}
</script>
<style lang="scss">
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>
