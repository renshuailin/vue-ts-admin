<template>
  <div class="chart">
    <el-tabs type="border-card" v-model="tab">
      <el-tab-pane label="折线图" name="line">
        <app-echarts :chartsData="chartsData" chartType="line"></app-echarts>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <app-echarts :chartsData="chartsData" chartType="bar"></app-echarts>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <app-echarts :chartsData="chartsData" chartType="pie"></app-echarts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
//引入echarts
import charts from "components/charts/charts.vue";
@Component({
  components: { "app-echarts": charts },
})
export default class ChartData extends Vue {
  @Provide() fruitTotal: any = [];
  @Provide() nameContainer: any = {};

  @Provide() Data: any = [];

  @Provide() Datay: number[] = [];
  @Provide() Datax: string[] = [];

  @Provide() tab: string = "line";
  @Provide() chartsData: any = {
    xAxis: ["水果", "家电", "食品", "饮料", "海鲜"],
    yAxis: [234, 534, 123, 435, 123],
  };
  created() {
    this.load();
    // console.log(this.Data);
    // this.check();
  }
  load() {
    (this as any).$axios(`/api/profiles/loadMore/1/50`).then((res: any) => {
      res.data.data.list.forEach((item: any) => {
        // console.log(item);
        this.nameContainer[item.type] = this.nameContainer[item.type] || [];

        //当逻辑或||时，找到为true的分项就停止处理，并返回该分项的值，否则执行完，并返回最后分项的值。

        this.nameContainer[item.type].push(item);
      });
      // console.log(this.nameContainer);

      Object.keys(this.nameContainer).forEach((nameItem: any) => {
        let count = 0;
        this.nameContainer[nameItem].forEach((item: any) => {
          count += item.count; // 遍历每种水果中包含的条目计算总数
        });
        this.fruitTotal.push({ name: nameItem, total: count });
      });

      console.log(this.fruitTotal);
      for (let i in this.fruitTotal) {
        this.Datay = this.fruitTotal[i].total;
        this.Datax.push(this.fruitTotal[i].name);
        this.Datay.push(this.fruitTotal[i].total);
      }
      // console.log(this.Data);
    });
  }
  total() {}
}
</script>

<style>
</style>