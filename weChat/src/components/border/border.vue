<template>
  <div class="border">
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
          url:  require('./icon5.png'),
          txt: '海关信用'
        },
        {
          url:  require('./icon6.png'),
          txt: '纳税信用'
        },
        {
          url:  require('./icon7.png'),
          txt: '食药监'
        },
        {
          url:  require('./icon8.png'),
          txt: '环评'
        },
        {
          url:  require('./icon9.png'),
          txt: '信用双公示'
        },
        {
          url:  require('./icon10.png'),
          txt: '专利'
        },
        {
          url:  require('./icon11.png'),
          txt: '商标'
        },
        {
          url:  require('./icon12.png'),
          txt: '招拍挂'
        },
        {
          url:  require('./icon13.png'),
          txt: '建设项目'
        },
        {
          url:  require('./icon14.png'),
          txt: '写字楼'
        },
        {
          url:  require('./icon15.png'),
          txt: '产业园区'
        },
        {
          url:  '',
          txt: ''
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
.border {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .squareWrapper {
    box-sizing: border-box;
    width: 25%;
    height: 180px;
    padding-top: 45px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1.4rem;
    color: #666666;
    &:nth-child(4n+4) {
      border-right: none;
    }
    &:nth-child(-n+4) {
      border-top: 1px solid #e0e0e0;
    }
  }
}
</style>
