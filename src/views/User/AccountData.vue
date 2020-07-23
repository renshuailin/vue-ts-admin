<template>
  <div class="accountdata">
    <div class="add">
      <el-button type="primary" @click="addGoods">添加账户</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.edit"
            v-model="scope.row.role"
            @change="selectChange(scope.row)"
          >
            <el-option v-for="item in Data" :label="item.role" :value="item.role" :key="item.key"></el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="des"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username!='admin'">
          <el-button
            size="mini"
            v-if="!scope.row.edit"
            @click="handleEdit(scope.$index,scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            v-else
            @click="handleComplete(scope.$index,scope.row)"
            type="success"
          >完成</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <app-AddUser @update="getData" @close="close" :dialogVisible="dialogVisible" :data="Data" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
//添加账户组件
import AddUser from "./AddUser.vue";
@Component({
  components: { "app-AddUser": AddUser },
})
export default class AccountData extends Vue {
  @Provide() dialogVisible: Boolean = false;
  @Provide() tableData: any = [];
  // 传出数据
  @Provide() Data: any = [
    { key: "admin", role: "管理员", des: "超级管理员" },
    { key: "editor", role: "客服", des: "超级客服员" },
    { key: "visitor", role: "访客", des: "普通" },
  ];
  addGoods() {
    this.dialogVisible = true;
  }
  created() {
    this.getData();
  }
  selectChange(item: any) {
    this.Data.map((option: any) => {
      if (option.role == item.role) {
        item.key = option.key;
        item.des = option.des;
      }
    });
  }
  getData() {
    (this as any).$axios(`/api/users/allUsers`).then((res: any) => {
      console.log(res.data);
      res.data.datas.forEach((item: any) => {
        item.edit = false;
      });
      this.tableData = res.data.datas;
      console.log(this.tableData);
    });
  }
  close() {
    this.dialogVisible = false;
  }
  handleEdit(index: number, row: any): void {
    row.edit = true;
  }
  del(index: number, row: any) {
    (this as any).$axios
      .delete(`/api/users/deleteUser/${row._id}`)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.tableData.splice(index, 1);
      });
  }
  handleComplete(index: number, row: any): void {
    row.edit = false;
    (this as any).$axios
      .post(`/api/users/editUser/${row._id}`, row)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      });
  }
}
</script>

<style lang='scss' scoped>
.accountdata {
  height: 100%;
  overflow: auto;
  .add {
    margin-bottom: 10px;
  }
}
</style>