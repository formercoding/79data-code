<template>
  <div class="v-list">
    <div class="record">
     搜索到<span class="num">{{list.record}}</span>
     条<span class="key">{{list.key}}</span>相关结果
    </div>
    <div class="list" v-for="item in list.list">
      <div class="title">
        <span class="txt">
          {{item.company}}
        </span>
        <span class="status">
          {{calStatus(item.status)}}
        </span>
      </div>
      <div class="info">
        <span>{{item.ceo}}</span>
        <span>成立{{item.time}}年</span>
        <span>{{item.money}}万人民币</span>
      </div>
      <div class="address">
        {{item.address}}
      </div>
    </div>
  </div>
</template>
<script>
  import {Hub} from 'assets/js/hub.js'
  const ERR_OK = 0;
  export default {
    data() {
      return {
        list_id: 0,
        list: {}
      }
    },
    components: {
    },
    methods: {
      calStatus(num) {
        if (num === 0) {
          return '在业';
        } else {
          return '存续';
        }
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
      let self = this;
      window.onscroll = function() {
        if (document.body.offsetHeight <= document.body.scrollTop + window.innerHeight) {
          self.$http.get('/api/list').then((response) => {
            response = response.body;
            if(response.errno === ERR_OK) {
              response.data.list.forEach(function (item, index) {
                self.list.list.push(item);
              })
            }
          });
        }
      }
    },
    computed: {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @blue: #007fff;
  @orange: #ffa000;
  .v-list {
    .record {
      height: 58px;
      padding: 0 25px;
      line-height: 58px;
      background: #f7f7f7;
      font-size: 1.4rem;
      color: #999999;
      .num {
        color: @blue;
      }
      .key {
        color: @orange;
      }
    }
    .list {
      padding: 33px 25px;
      background: #fff;
      border-bottom: 1px solid #ebf0f1;
      .title {
        position: relative;
        .txt {
          font-weight: bold;
          font-size: 1.6rem;
          color: #333;
        }
        .status {
          position: absolute;
          right: 0;
          padding: 3px 12px;
          border: 1px solid @blue;
          border-radius: 2px;
          font-size: 1.4rem;
          line-height: 28px;
          color: @blue;
        }
      }
      .info {
        margin: 28px 0;
        span {
          padding: 0 20px;
          border-right: 1px solid #666666;
          color: #868686;
          font-size: 1.2rem;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            border-right: 0;
          }
        }
      }
      .address {
        font-size: 1.2rem;
        color: #868686;
      }
    }
  }
</style>
