<template>
  <div class="v-dsearch">
    <input type="text" name="" placeholder="小米" id="dinp">
    <span class="icon-search" @click="goThree"></span>
  </div>
</template>

<script>
import {Hub} from 'assets/js/hub.js'
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    goThree() {
      this.$router.push('three');
    }
  },
  mounted() {
    this.value = Hub.value;
    let inp = document.getElementById('dinp');
    console.log(inp);
    inp.value = this.value;
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .v-dsearch {
    position: relative;
    input {
      width: 100%;
      box-sizing: border-box;
      height: 50px;
      padding: 0 65px 0 22px;
      border-radius: 5px;
      outline: none;
      border: none;
      color: #666;
    }
    .icon-search {
      position: absolute;
      right: 20px;
      top: 0;
      line-height: 55px;
      font-size: 1.6rem;
      color: #676767;
    }
  }
</style>
