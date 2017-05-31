<template>
  <div class="v-search">
    <div class="content">
      <input type="text"  :placeholder="calP" id="inp">
      <div class="select">
        <span class="province">{{area}}</span>
        <span class="icon-triangle-down" @click='switchArea(area)'></span>
      </div>
      <div class="search-btn" @click="goDetail">
        <span class="icon-search"></span>
      </div>
    </div>
    <v-area v-show="areaShow" @switch="switchArea" :area="area"></v-area>
  </div>
</template>

<script>
  import vArea from 'components/area/area'
  import {Hub} from 'assets/js/hub.js'
  const ERR_OK = 0;
  export default {
    data() {
      return {
        area: '全国',
        collect: {
        },
        areaShow: false
      }
    },
    created() {
      let pre = returnCitySN.cname.indexOf('省') + 1;
      let end = returnCitySN.cname.indexOf('市');
      let params = {
        id: returnCitySN.cid
      };
      this.area = returnCitySN.cname.slice(pre, end);
      this.$http.get('/api/collect', {params: params}).then((response) => {
          response = response.body;
          if(response.errno === ERR_OK) {
            this.collect = response.data;
          }
      });
    },
    methods: {
      goDetail() {
        let value = document.getElementById('inp').value;
        Hub.value = value;
        this.$router.push('detail');
      },
      switchArea(area) {
        this.area = area;
        this.areaShow = !this.areaShow;
      }
    },
    computed: {
      calP() {
        return `总量${this.collect.collected} 今日新增${this.collect.new}`;
      }
    },
    components: {
      vArea
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .v-search {
    text-align: left;
    .content {
      position: relative;
      width: 100%;
      text-align: left;
      input {
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        padding-left: 105px;
        padding-right: 120px;
        border-radius: 10px;
        border: 0;
        outline: none;
        font-size: 1rem;
        color: #828282;
      }
      .select {
        position: absolute;
        left: 17px; 
        top: 0;
        color: #828282;
        line-height: 65px;
        .province {
          font-size: 1.6rem;
        }
        .icon-triangle-down {
          font-size: 1rem;
        }
      }
      .search-btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 114px;
        height: 70px;
        border-radius: 0 10px 10px 0;
        background: #fda749;
        text-align: center;
        .icon-search {
          font-size: 2rem;
          line-height: 70px;
        }
      }
    }
  }
</style>
