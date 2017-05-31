<template>
  <div class="v-area">
    <div class="back">
      <span class="icon-angle-left" @click="hideArea"></span>
    </div>
    <div class="search">
      <input type="text"/>
      <span class="icon-search"></span>
    </div>
    <div class="current">当前：{{currentCity}}</div>
    <div class="fixed">
      <span class="title">当前定位城市</span>
      <div class="city">{{fixedCity}}</div>
    </div>
    <div class="recent">
      <span class="title">最近访问城市</span>
      <div class="citys">
        <span class="city">江苏</span>
        <span class="city">福建</span>
      </div>
    </div>
    <div class="hot">
      <span class="title">热门城市</span>
      <div class="citys">
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">江苏</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">江苏</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">江苏</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">福建</span>
        <span class="city" @click="setCity">江苏</span>
        <span class="city" @click="setCity">福建</span>
      </div>
    </div>
    <div class="list">
      <ul>
        <li>
          <span class="letter">A</span>
          <div>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
          </div>
        </li>
        <li>
          <span class="letter">A</span>
          <div>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
          </div>
        </li>
        <li>
          <span class="letter">A</span>
          <div>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">福建</span>
            <span class="city" @click="setCity">江苏</span>
            <span class="city" @click="setCity">福建</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: { 
    area: String  
  },
  data() {
    return {
      fixedCity: '',
      currentCity: this.area
    }
  },
  created() {
    let pre = returnCitySN.cname.indexOf('省') + 1;
    let end = returnCitySN.cname.indexOf('市');
    this.fixedCity = returnCitySN.cname.slice(pre, end);
  },
  methods: {
    goIndex() {
      this.$router.replace('index');
    },
    setCity() {
      this.currentCity = event.target.innerHTML;
    },
    hideArea() {
      this.$emit('switch', this.currentCity);
    }
  },
  components: {
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.v-area {
  position: absolute;
  z-index: 1000;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  .back {
    height: 50px;
    padding-left: 10px;
    line-height: 50px;
    border-bottom: 1px solid #ececec;
    font-size: 1.8rem;
    color: #666666;
  }
  .search {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid #ececec;
    background: #fff;
    input {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      padding: 0 30px;
      border-radius: 2px;
      background: #C4C4C4;
      border: none;
      outline: none;
      color: #666;
    }
    .icon-search {
      position: absolute;
      top: 18px;
      left: 20px;
      color: #666;
    }
  }
  .current {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    color: #333;
  }
  .fixed {
    padding: 0 10px;
    background: #ececec;
    .title {
      color: #666;
      line-height: 40px;
    }
    .city {
      width: 100px;
      padding: 5px 2px;
      border: 1px solid #ececec;
      border-radius: 3px;
      background: #fff;
      text-align: center;
      color: #333;
    }
  }
  .recent {
    padding: 0 10px;
    background: #ececec;
    .title {
      color: #666;
      line-height: 40px;
    }
    .city {
      display: inline-block;
      width: 100px;
      padding: 5px 2px;
      border: 1px solid #ececec;
      border-radius: 3px;
      background: #fff;
      text-align: center;
      color: #333;
    }
  }
  .hot {
    padding: 0 10px;
    border-bottom: 1px solid #e0e0e0;
    background: #ececec;
    .title {
      color: #666;
      line-height: 40px;
    }
    .city {
      display: inline-block;
      width: 100px;
      margin-bottom: 10px;
      padding: 5px 2px;
      border: 1px solid #ececec;
      border-radius: 3px;
      background: #fff;
      text-align: center;
      color: #333;
    }
  }
  .list {
    li {
      .letter {
        display: inline-block;
        width: 100%;
        padding: 0 10px;
        line-height: 30px;
        background: #ececec;
        color: #666;
      }
      div {
        margin-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
        color: #666;
        span {
          display: block;
          border-bottom: 1px solid #CAC6C6;
        }
      }
    }
  }
}
</style>
