<template>
  <div class="v-footer">
    <div class="inner">
      <div v-for="(item, index) in source" class="squareWrapper" @click="goRouter(index)" :class="{'active': index === currentIndex}">
        <square :url="item.url" :txt="item.txt"></square>
      </div>
    </div>
  </div>
</template>

<script>
import square from 'components/square/square'
export default {
  props: {
    currentIndex: Number
  },
  data() {
    return {
      source: [
        {
          url:  require('./icon16.png'),
          txt: '搜企业'
        },
        {
          url:  require('./icon17.png'),
          txt: '看专题'
        },
        {
          url:  require('./icon18.png'),
          txt: '关于我'
        }
      ]
    }
  },
  methods: {
    goRouter(index) {
      if (index === 0) {
        this.$router.push('index');
      } else if (index === 2) {
        this.$router.push('aboutus');
      }
    }
  },
  components: {
    square
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.v-footer {
  margin-top: 160px;
  .inner {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    padding-bottom: 12px;
    border-top: 1px solid #e0e0e0;
    background: #fff;
    z-index: 100;
    .squareWrapper {
      flex-grow: 1;
      .square {
        img {
          margin-top: 20px;
          margin-bottom: 14px;
        }
      }
    }
    .squareWrapper.active {
      color: #FF7F7F;
    }
  }
}
</style>
