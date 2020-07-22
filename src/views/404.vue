<template>
  <div class="error">
    <div class="pic">
      <img src="~assets/404_images/404.png" />
    </div>
    <div class="not">
      <span>你访问的页面不存在</span>
      <span>
        你可以尝试
        <button href="link" class="link" @click="$router.go(-1)">返回上一页</button>
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Error extends Vue {}
</script>

<style lang="scss" scoped>
.error {
  height: 100%;
  display: flex;
  .pic {
    text-align: center;
    width: 60%;
    padding: 50px;
    img {
      width: 600px;
    }
  }
  .not {
    padding: 150px 0;
    overflow: hidden;
    span {
      display: block;
      line-height: 60px;
      font-size: 18px;
      color: #8b7b8b;
      .link {
        color: #5cacee;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>