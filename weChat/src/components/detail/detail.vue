<template>
  <div class="detail">
    <div class="head">
      <div class="search-wrapper">
        <v-search></v-search>
      </div>
    </div>
    <div class="sort-wrapper">
       <v-sort @switch="switchList"></v-sort> 
    </div>
    <div class="list-wrapper" v-show="listShow">
      <v-list></v-list>
    </div>
  </div>
</template>

<script>
  import {Hub} from 'assets/js/hub.js'
  import vSearch from 'components/detailSearch/detailSearch'
  import vSort from 'components/sort/sort'
  import vList from 'components/list/list'
  const ERR_OK = 0;
  export default {
    data() {
      return {
        value: '',
        listShow: true,
        list_id: 0,
        list: {}
      }
    },
    created() {
      let params = {
        provice: Hub.value,
        id: this.list_id
      }
      this.list_id++;
      this.$http.get('/api/list', {params: params}).then((response) => {
        response = response.body;
        if(response.errno === ERR_OK) {
          this.list = response.data;
        }
      });
    },
    methods: {
      switchList(flag) {
        this.listShow = flag;
      }
    },
    components: {
      vSearch,
      vSort,
      vList
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .detail {
    .head {
      height: 100px;
      padding-top: 25px;
      box-sizing: border-box;
      background: url('banner.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      .search-wrapper {
        height: 50px;
        margin: 0 45px;
      }
    }
    .sort-wrapper {
      background: #f5f5f5;
    }
  }
</style>
