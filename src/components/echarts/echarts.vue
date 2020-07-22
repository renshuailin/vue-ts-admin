<template>
  <div class="charts" :style="{width:chartWidth,height:chartHeight}"></div>
</template>

<script lang='ts'>
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class echarts extends Vue {
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
}
</script>

<style lang='scss' scoped>
</style>