<template>
  <div>
    <div class="banner">
     <span class="title">搜企业,就上企搜搜</span>
     <div class="search-wrapper">
        <search></search>
     </div>
     <div class="footer">
       <span class="record">热搜：{{toRecord}}</span>
       <div class="reload" @click="updateRecord">
         <span class="icon-reload"></span>
         <span class="update">换一批</span>
       </div>
     </div>
    </div>
    <div class="borderTop-wrapper">
      <border-top></border-top>
    </div>
     <div class="border-wrapper">
      <border></border>
    </div>
    <v-footer :currentIndex='0'></v-footer>
  </div>
</template>

<script>
  import search from 'components/search/search'
  import borderTop from 'components/border-top/border-top'
  import border from 'components/border/border'
  import vFooter from 'components/footer/footer'
  const ERR_OK = 0
  export default {
    data() {
      return {
        record_id: 1,
        record: []
      }
    },
    computed: {
      toRecord() {
        let str = '';
        this.record.forEach(function (item) {
          str += item + ' ';
        });
        return str;
      }
    },
    created() {
      let params = {
        id: this.record_id
      }
      this.record_id++;
      this.$http.get('/api/record', {params: params}).then((response) => {
        response = response.body;
        if(response.errno === ERR_OK) {
          this.record = response.data;
        }
      });
    },
    methods: {
      updateRecord() {
        let params = {
            id: this.record_id
        }
        this.record_id++;
        this.$http.get('/api/record', {params: params}).then((response) => {
          response = response.body;
          if(response.errno === ERR_OK) {
            this.record = response.data;
          }
        });
      }
    },
    components: {
      search,
      borderTop,
      border,
      vFooter
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .banner {
    width: 100%;
    height: 305px;
    color: #fff;
    background: url('../../assets/images/banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
    .title {
      display: inline-block;
      margin-top: 69px;
      margin-bottom: 40px;
      font-size: 1.8rem;
    }
    .search-wrapper {
      height: 75px;
      padding: 0 34px;
      text-overflow: ellipsis;
    }
    .footer {
      position: relative;
      text-align: left;
      margin-top: 37px;
      margin-left: 45px;
      .record {
        display: block;
        overflow: hidden;
        padding-right: 250px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .reload {
        position: absolute;
        top: 0;
        right: 35px;
      }
    }
  }
</style>
