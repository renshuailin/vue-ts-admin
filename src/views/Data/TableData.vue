<template>
  <div class="table">
    <div class="search">
      <el-input size="small" v-model="Search" placeholder="请输入关键字"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <el-table :data="Data" border style="width:100%" :height="Height" class="table-class" stripe>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="等级" prop="level" width="120"></el-table-column>
      <el-table-column label="数量" prop="count" width="120"></el-table-column>
      <el-table-column label="上线日期" prop="date" width="160"></el-table-column>
      <el-table-column v-if="getUser.key !='visitor'" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" @click="del(scope.$index,scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" ref="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="Size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Total"
      ></el-pagination>
    </div>
    <app-EditToast :dialogVisible="dialogVisible" :form="formData" @close="close"></app-EditToast>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
//编辑
import EditToast from "./EditToast.vue";
// 引入vuex 装饰
import { State, Getter, Action, Mutation } from "vuex-class";
@Component({
  components: { "app-EditToast": EditToast },
})
export default class TableData extends Vue {
  @Getter("user") getUser: any;

  @Provide() Search: string = "";
  @Provide() Height: number = document.body.offsetHeight - 270;
  @Provide() Data: any = []; //数据
  @Provide() Page: number = 1; //当前页
  @Provide() Size: number = 5; //默认请求5条
  @Provide() Total: number = 0; //总共

  // 跳出
  @Provide() dialogVisible: Boolean = false;
  @Provide() formData: Object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: "",
  };

  load() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.Page}/${this.Size}`)
      .then((res: any) => {
        // console.log(res.data);
        this.Data = res.data.data.list;
        this.Total = res.data.data.total;
      });
  }
  created() {
    this.load();
    // console.log(this.Data);
  }
  //跳出
  edit(index: number, row: any) {
    console.log(index, row);
    this.formData = row;
    this.dialogVisible = true;
  }
  close() {
    this.dialogVisible = false;
  }
  del(index: number, row: any) {
    (this as any).$axios
      .delete(`/api/profiles/delete/${row._id}`)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.Data.splice(index, 1);
      });
  }
  handleSizeChange(val: number): void {
    this.Size = val;
    // console.log(this.Size);
    this.Page = 1;
    this.Search ? this.loadSearch() : this.load();
  }
  handleCurrentChange(val: number): void {
    this.Page = val;
    // console.log(this.Page);
    // this.Page = 1;
    this.Search ? this.loadSearch() : this.load();
  }
  search(): void {
    this.Page = 1;
    this.Search ? this.loadSearch() : this.load();
  }
  loadSearch() {
    (this as any)
      .$axios(`/api/profiles/search/${this.Search}/${this.Page}/${this.Size}`)
      .then((res: any) => {
        // console.log(res.data);
        this.Data = res.data.datas.list;
        this.Total = res.data.datas.total;
      });
  }
}
</script>

<style lang='scss' scoped>
.table {
  height: 100%;
  .table-class {
    font-size: 14px;
  }
  .page {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>