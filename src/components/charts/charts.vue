<template>
  <div v-if="chartsData" ref="charts" class="charts" :style="{width:chartWidth,height:chartHeight}"></div>
</template>

<script lang='ts'>
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
//echarts
import echarts from "echarts";
@Component({
  components: {},
})
export default class charts extends Vue {
  @Prop({ type: String, default: "line" }) readonly chartType!: string; //图表类型
  @Prop(Object) chartsData!: string | null;

  @Provide() chartWidth: string = "";
  @Provide() chartHeight: string = "";

  created() {
    this.autoSize();
  }
  autoSize() {
    this.chartWidth = `${document.body.offsetWidth * 0.6}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
  }

  mounted() {
    this.draw();
    // console.log(this.chartsData);
  }
  draw() {
    //实例echarts
    let chart = echarts.init((this as any).$refs.charts as HTMLCanvasElement);
    if (chart == undefined) {
      console.log(`echarts初始化失败`);
      return;
    }
    switch (this.chartType) {
      case "line":
        chart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        chart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        chart.setOption((this as any).generatorPieOption());
        break;
      default:
        console.log(`chartType不合法`);
        break;
    }
  }
  generatorLineOption() {
    //折线图
    return {
      title: {
        text: "近一周添加量",
        subtext: "test",
        x: "center",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: (this as any).chartsData.xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: (this as any).chartsData.yAxis,
          type: "line",
          areaStyle: {},
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
      },
    };
  }
  generatorBarOption() {
    //处理数据

    return {
      title: {
        text: "近一周添加量",
        subtext: "test",
        x: "center",
      },
      xAxis: {
        type: "category",
        data: (this as any).chartsData.xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: (this as any).chartsData.yAxis,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
          barWidth: "50%",
        },
      ],
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
      },
    };
  }
  generatorPieOption() {
    let pieData = [];
    for (const key in (this as any).chartsData.xAxis) {
      pieData.push({
        value: (this as any).chartsData.yAxis[key],
        name: (this as any).chartsData.xAxis[key],
      });
    }
    return {
      title: {
        text: "近一周添加量",
        subtext: "test",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartsData.xAxis,
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
</script>

<style lang='scss' scoped>
</style>