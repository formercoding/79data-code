<template>
  <div class="v-three">
    <div class="company">
      <span class="title">{{details.company}}</span>
      <div class="info">
        <span>状态：{{details.status}}</span>
        <span>电话：{{details.tel}}</span>
        <span>官网：{{details.web}}</span>
        <span>地址：{{details.address}}</span>
      </div>
      <div class="act">
        <span class="belong">认领该公司</span>
        <span class="circle">
          <span class="icon-search"></span>
        </span>
      </div>
    </div>
    <div class="info-wrapper">
      <v-info></v-info>
    </div>
  </div>
</template>
<script>
import vInfo from 'components/info/info'
const ERR_OK = 0;
export default {
  data() {
    return {
      details: {}
    }
  },
  components: {
    vInfo
  },
  created() {
    let params = {
      id: 0
    };
    this.$http.get('/api/details', {params: params}).then((response) => {
      response = response.body;
      if(response.errno === ERR_OK) {
        this.details = response.data;
      }
    });
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @blue: #007fff;
  .v-three {
    .company {
      position: relative;
      padding: 42px 22px 38px 25px;
      background: #f7f7f7;
      .title {
        display: inline-block;
        color: #333;
        font-size: 1.6rem;
        padding-bottom: 31px;
      }
      .info {
        span {
          display: block;
          margin-bottom: 16px;
          color: #6e6e6e;
        }
      }
      .act {
        position: absolute;
        right: 0;
        top: 43px;
        .belong {
          display: inline-block;
          width: 140px;
          height: 28px;
          border-radius: 2px;
          border: 1px solid @blue;
          line-height: 28px;
          text-align: center;
          font-size: 1.3rem;
          color: @blue;
        }
        .circle {
          display: inline-block;
          width: 28px;
          height: 28px;
          margin-left: 12px;
          margin-right: 22px;
          vertical-align: top;
          text-align: center;
          line-height: 28px;
          border-radius: 50%;
          background: #c3c3c3;
        }
        .icon-search {
          color: #fff;
        }
      }
    }
  }
</style>
