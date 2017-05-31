<template>
  <div id="app">
    <div class="header">
      <div class="back">
        <span class="icon-angle-left"></span>
        <span class="txt" @click="goBack">返回</span>
      </div>
      <span class="title">企搜搜</span>
      <span class="more icon-more_horiz"></span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {Hub} from 'assets/js/hub.js'
const ERR_OK = 0;
export default {
  created() {
    let params = {
      id: 0
    }
    this.$http.get('/api/record', {params: params}).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.record = response.data;
      }
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  body {
    background: #f8f8f8;
    .header {
      display: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 88px;
      font-size: 1.6rem;
      line-height: 88px;
      color: #fff;
      background: #393939;
      text-align: center;
      .back {
        display: inline-block;
        position: absolute;
        left: 22px;
        .icon-angle-left {
          font-size: 2rem;
          vertical-align: text-top;
        }
      }
      .more {
        display: inline-block;
        position: absolute;
        top: 32px;
        right: 27px;
        vertical-align: text-top;
        font-size: 2rem;
      }
     
    }
  }  
</style>
