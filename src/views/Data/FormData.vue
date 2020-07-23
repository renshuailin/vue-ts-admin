<template>
  <div class="formdata">
    <el-form ref="rule" label-width="100px" :rules="rule" :model="form">
      <el-form-item label="商品内容" prop="title">
        <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品等级" prop="level">
        <el-select v-model="form.level" placeholder="请选择商品等级">
          <el-option label="优等品" value="优等品"></el-option>
          <el-option label="合格品" value="合格品"></el-option>
          <el-option label="次品" value="次品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input v-model="form.count" placeholder="请输入商品数量"></el-input>
      </el-form-item>
      <el-form-item label="入库时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="种类" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="水果" name="type"></el-radio>
          <el-radio label="海鲜" name="type"></el-radio>
          <el-radio label="食品" name="type"></el-radio>
          <el-radio label="饮料" name="type"></el-radio>
          <el-radio label="家电" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLogin" type="primary" @click="addGoods('rule')">添加商品</el-button>
        <el-button @click="reset('rule')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {},
})
export default class FormData extends Vue {
  @Provide() form: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: "",
  };
  @Provide() isLogin: Boolean = false;
  @Provide() rule: any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change",
      },
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change",
      },
    ],
  };
  addGoods(form: string) {
    (this as any).$refs[form].validate((valid: boolean) => {
      if (valid) {
        this.isLogin = true;
        (this as any).$axios
          .post(`/api/profiles/add`, this.form)
          .then((res: any) => {
            console.log(res);
            this.isLogin = false;
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.reset(form);
          });
      }
    });
  }
  reset(form: string) {
    (this as any).$refs[form].resetFields();
  }
}
</script>

<style lang="scss" scoped>
.formdata {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .el-input,
  .el-select {
    width: 200px !important;
  }
  .division {
    margin: 0 10px;
    color: #606266;
  }
}
</style>
