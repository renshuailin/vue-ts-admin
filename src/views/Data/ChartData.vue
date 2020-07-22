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
import echarts from "components/echarts/echarts.vue";
@Component({
  components: { "app-echarts": echarts }
})
export default class ChartData extends Vue {
  @Provide() tab: string = "line";
  @Provide() chartsData: any = {
    xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yAxis: [110, 932, 901, 934, 1290, 1330, 1320]
  };
}
</script>

<style>
</style>