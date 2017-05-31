<template>
  <div class="square">
    <img :src="url"/>
    <div>
      <span class="txt">{{txt}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    txt: String
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .square {
    text-align: center;
    img {
      margin-bottom: 20px;
    }
  }
</style>
