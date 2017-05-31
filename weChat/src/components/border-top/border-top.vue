<template>
  <div class="border-top">
    <div v-for="item in source" class="squareWrapper">
        <square :url="item.url" :txt="item.txt"></square>
    </div>
  </div>
</template>

<script>
import square from 'components/square/square'
export default {
  data() {
    return {
      source: [
        {
          url:  require('./icon1.png'),
          txt: '股东高管'
        },
        {
          url:  require('./icon2.png'),
          txt: '股东高管'
        },
        {
          url:  require('./icon3.png'),
          txt: '股东高管'
        },
        {
          url:  require('./icon4.png'),
          txt: '股东高管'
        }
      ]
    }
  },
  components: {
    square
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.border-top {
  display: flex;
  background: #f8f8f8;
  .squareWrapper {
    margin: 45px 0;
    width: 25%;
    border-right: 1px solid #676767;
    font-size: 1.6rem;
    color: #666666;
    &:last-child {
      border-right: 0;
    }
  }
}
</style>
