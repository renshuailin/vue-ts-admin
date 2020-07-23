<template>
  <!-- <el-dialog :visible.sync="dialogVisible">
    <el-form :model="form" label-width="100px" size="small" class="form-box"></el-form>
  </el-dialog>-->
  <el-dialog
    title="编辑信息"
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="dialogVisible"
  >
    <el-form
      :rules="rule"
      :model="form"
      label-width="100px"
      size="small"
      class="form-box"
      ref="form"
    >
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button @click="confirm('form')" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component({
  components: {},
})
export default class EditDialog extends Vue {
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    title: string;
    type: string;
    level: string;
    count: string;
    date: string;
    _id: string;
  };
  @Provide() rule: any = {
    title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  };
  confirm(data: any) {
    (this.$refs[data] as any).validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .post(`/api/profiles/edit/${this.form._id}`)
          .then((res: any) => {
            // console.log(res.data);
            this.$emit("close");
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          });
      }
    });
  }
  created() {
    console.log(this.form, this.dialogVisible);
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 300px !important;
  }
}
</style>
