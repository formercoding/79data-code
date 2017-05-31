<template>
    <div class="v-history">
      <span class="title">浏览历史</span>
      <ul>
        <li>小米科技有限公司</li>
        <li>小米科技有限公司</li>
        <li>小米科技有限公司</li>
      </ul>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .v-history {
    margin-bottom: 20px;
    border-bottom: 1px solid #cddcf6;
    background: #fff;
    font-size: 1.4rem;
    color: #333;
    .title {
      display: block;
      padding: 0 25px;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #dfdfdf;
      }
      ul {
        padding: 0 25px;
        li {
          height: 40px;
          margin-top: 10px;
          line-height: 30px;
        }
      }
  }
</style>
