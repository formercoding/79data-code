<template>
  <div class="v-sort">
    <div class="cond-wrap" @click="switchList">
      <div class="cond" :class="{'active':cond[0]}" @click="calCon(0)">
        <span class="txt">地区</span>
        <span class="icon-triangle-down"></span>
      </div>
      <div class="cond" :class="{'active':cond[1]}" @click="calCon(1)">
        <span class="txt">行业</span>
        <span class="icon-triangle-down"></span>
      </div>
      <div class="cond" :class="{'active':cond[2]}" @click="calCon(2)">
        <span class="txt">筛选</span>
        <span class="icon-triangle-down"></span>
      </div>
      <div class="cond" :class="{'active':cond[3]}" @click="calCon(3)">
        <span class="txt">排序</span>
        <span class="icon-triangle-down"></span>
      </div>
    </div>
    <div class="option" v-show="optShow">
      <div class="area" v-show="cond[0]">
        <div class="all" :class="area" @click="clearArea">{{areaSelect}}</div>
        <div class="hot">
          <div class="label">热门城市</div>
          <span @click="areaChange">北京</span>
          <span @click="areaChange">上海</span>
          <span @click="areaChange">广州</span>
          <span @click="areaChange">深圳</span>
          <span @click="areaChange">天津</span>
          <span @click="areaChange">重庆</span>
          <span @click="areaChange">杭州</span>
          <span @click="areaChange">成都</span>
          <span @click="areaChange">南京</span>
          <span @click="areaChange">苏州</span>
          <span @click="areaChange">大连</span>
          <span @click="areaChange">武汉</span>
        </div>
        <div class="region">
          <div class="label">按区域划分</div>
          <div>
            <label class="label-label">华东地区</label>
            <span @click="areaChange">山东</span>
            <span @click="areaChange">江苏</span>
            <span @click="areaChange">安徽</span>
            <span @click="areaChange">江西</span>
            <span @click="areaChange">浙江</span>
            <span @click="areaChange">福建</span>
            <span @click="areaChange">上海</span>
          </div>
          <div>
            <label class="label-label">华南地区</label>
            <span @click="areaChange">广东</span>
            <span @click="areaChange">广西</span>
            <span @click="areaChange">海南</span>
          </div>
          <div>
            <label class="label-label">华中地区</label>
            <span @click="areaChange">湖北</span>
            <span @click="areaChange">湖南</span>
            <span @click="areaChange">河南</span>
          </div>
          <div>
            <label class="label-label">华北地区</label>
            <span @click="areaChange">北京</span>
            <span @click="areaChange">天津</span>
            <span @click="areaChange">河北</span>
            <span @click="areaChange">山西</span>
            <span @click="areaChange">内蒙古</span>
          </div>
          <div>
            <label class="label-label">西北地区</label>
            <span @click="areaChange">宁夏</span>
            <span @click="areaChange">新疆</span>
            <span @click="areaChange">青海</span>
            <span @click="areaChange">陕西</span>
            <span @click="areaChange">甘肃</span>
            <span @click="areaChange">内蒙古</span>
          </div>
          <div>
            <label class="label-label">西南地区</label>
            <span @click="areaChange">四川</span>
            <span @click="areaChange">云南</span>
            <span @click="areaChange">贵州</span>
            <span @click="areaChange">西藏</span>
            <span @click="areaChange">重庆</span>
          </div>
          <div>
            <label class="label-label">东北地区</label>
            <span @click="areaChange">辽宁</span>
            <span @click="areaChange">吉林</span>
            <span @click="areaChange">黑龙江</span>
            <span @click="areaChange">内蒙古</span>
          </div>
          <div>
            <label class="label-label">港澳台地区</label>
            <span @click="areaChange">台湾</span>
            <span @click="areaChange">香港</span>
            <span @click="areaChange">澳门</span>
          </div>
        </div>
      </div>
      <div class="trade" v-show="cond[1]">
        <div class="all" @click="clearTrade" :class="trade">{{tradeSelect}}</div>
        <div @click="tradeChange">农、林、牧、渔业</div>
        <div @click="tradeChange">采矿业</div>
        <div @click="tradeChange">制造业</div>
        <div @click="tradeChange">电力、热力、燃气及生产和供应业</div>
        <div @click="tradeChange">建筑业</div>
        <div @click="tradeChange">批发和零售业</div>
        <div @click="tradeChange">交通运输、仓储和邮政业</div>
        <div @click="tradeChange">住宿和餐饮业</div>
        <div @click="tradeChange">信息运输、软件和信息技术服务业</div>
        <div @click="tradeChange">金融业</div>
        <div @click="tradeChange">房地产业</div>
        <div @click="tradeChange">租赁和商务服务业</div>
        <div @click="tradeChange">科学研究和技术服务业</div>
        <div @click="tradeChange">水利、环境和公共设施管理业</div>
        <div @click="tradeChange">居民服务、修理和其他服务业</div>
        <div @click="tradeChange">教育</div>
        <div @click="tradeChange">卫生和社会工作</div>
        <div @click="tradeChange">文化、体育和娱乐业</div>
        <div @click="tradeChange">公共管理、社会保障和社会组织</div>
        <div @click="tradeChange">国际组织</div>
      </div>
      <div class="filter" v-show="cond[2]">
        <div class="all" :class="filter">{{filterSelect}}</div>
        <div>
          <label>商标：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">有</span>
          <span @click="selectFilter">无</span>
        </div>
        <div>
          <label>专利：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">有</span>
          <span @click="selectFilter">无</span>
        </div>
        <div>
          <label>失信信息：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">有</span>
          <span @click="selectFilter">无</span>
        </div>
        <div>
          <label>联系电话：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">有</span>
          <span @click="selectFilter">无</span>
        </div>
        <div>
          <label>注册资本：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">0-100万</span>
          <span @click="selectFilter">100-200万</span>
          <span @click="selectFilter">200-500万</span>
          <span @click="selectFilter">500-1000万</span>
          <span @click="selectFilter">1000万以上</span>
        </div>
        <div>
          <label>成立年限：</label>
          <span @click="selectFilter">不限</span>
          <span @click="selectFilter">一年内</span>
          <span @click="selectFilter">1-5年</span>
          <span @click="selectFilter">5-10年</span>
          <span @click="selectFilter">10-15年</span>
          <span @click="selectFilter">15年以上</span>
        </div>
      </div>
      <div class="order" v-show="cond[3]">
        <div class="all" :class="order">{{orderSelect}}</div>
        <div>
          <label>注册资本:</label>
          <span @click="selectOrder">不限</span>
          <span @click="selectOrder">由高到低</span>
          <span @click="selectOrder">由低到高</span>
        </div>
        <div>
          <label>成立期限:</label>
          <span @click="selectOrder">不限</span>
          <span @click="selectOrder">由长到短</span>
          <span @click="selectOrder">由短到长</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cond: [false, false, false, false],
        areaSelect: [],
        tradeSelect: [],
        filterSelect: [],
        orderSelect: []
      }
    },
    methods: {
      clearArea: function() {
        this.area = 'act';
        this.areaSelect = [];
        let wrap = event.target.parentNode;
        let els = wrap.getElementsByClassName('active');
        let len = els.length;
        for (let i = 0; i < len; i++) {
          els[0].className = '';
        }
      },
      clearTrade: function() {
        this.trade = 'act';
        this.tradeSelect = [];
        let wrap = event.target.parentNode;
        let els = wrap.getElementsByClassName('active');
        let len = els.length;
        for (let i = 0; i < len; i++) {
          els[0].className = '';
        }
      },
      switchList: function() {
        this.$emit('switch', !this.optShow);
      },
      calCon: function (num) {
        num = parseInt(num);
        this.cond.forEach((item, index) => {
          if (num === index) {
            this.$set(this.cond, index, !item);
          } else {
            this.$set(this.cond, index, false);
          }
        });
      },
      areaChange() {
        this.area = '';
        var el = event.target;
        let cls = el.className;
        if (cls === 'active') {
          console.log(el);
          let txt = el.innerHTML;
          this.areaSelect.forEach((item, index) => {
            if (item === txt) {
              this.areaSelect.splice(index, 1);
            }
          });
          el.className = '';
        } else {
          this.areaSelect.push(el.innerHTML);
          el.className = 'active';
        }
      },
      tradeChange() {
        this.area = '';
        var el = event.target;
        let cls = el.className;
        if (cls === 'active') {
          let txt = el.innerHTML;
          this.areaSelect.forEach((item, index) => {
            if (item === txt) {
              this.tradeSelect.splice(index, 1);
            }
          });
          el.className = '';
        } else {
          this.tradeSelect.push(el.innerHTML);
          el.className = 'active';
        }
      },
      selectFilter() {
        this.filter = '';
        let el = event.target;
        let cls = el.className;
        let len = el.parentNode.getElementsByClassName('active').length;
        if (cls === 'active') {
          let txt = el.innerHTML;
          this.filterSelect.forEach((item, index) => {
            if (item.value === txt) {
              this.filterSelect.splice(index, 1);
            }
          });
          el.className = '';
        } else if (len === 1) {
          let txt = el.parentNode.childNodes[0].innerHTML;
          el.parentNode.getElementsByClassName('active')[0].className = '';
          this.filterSelect.forEach((item, index) => {
            if (item.key === txt) {
              this.filterSelect.splice(index, 1);
            }
          });

          let key = el.parentNode.childNodes[0].innerHTML;
          let value = el.innerHTML;
          let obj = {};
          obj.key = key;
          obj.value = value;
          this.filterSelect.push(obj);
          el.className = 'active';
        } else {
          let key = el.parentNode.childNodes[0].innerHTML;
          let value = el.innerHTML;
          let obj = {};
          obj.key = key;
          obj.value = value;
          this.filterSelect.push(obj);
          el.className = 'active';
        }
      },
      selectOrder() {
        this.order = '';
        let el = event.target;
        let cls = el.className;
        let len = el.parentNode.getElementsByClassName('active').length;
        if (cls === 'active') {
          let txt = el.innerHTML;
          console.log(txt);
          this.orderSelect.forEach((item, index) => {
            if (item.value === txt) {
              this.orderSelect.splice(index, 1);
            }
          });
          el.className = '';
        } else if (len === 1) {
          let txt = el.parentNode.childNodes[0].innerHTML;
          el.parentNode.getElementsByClassName('active')[0].className = '';
          this.orderSelect.forEach((item, index) => {
            if (item.key === txt) {
              this.orderSelect.splice(index, 1);
            }
          });

          let key = el.parentNode.childNodes[0].innerHTML;
          let value = el.innerHTML;
          let obj = {};
          obj.key = key;
          obj.value = value;
          this.orderSelect.push(obj);
          el.className = 'active';
        } else {
          let key = el.parentNode.childNodes[0].innerHTML;
          let value = el.innerHTML;
          let obj = {};
          obj.key = key;
          obj.value = value;
          this.orderSelect.push(obj);
          el.className = 'active';
        }
      },
    },
    computed: {
      optShow() {
        let flag = false;
        this.cond.forEach((item, index) => {
          if (item === true) {
            flag = true;
          }
        });
        return flag;
      },
      trade() {
        if (this.tradeSelect.length === 0) {
          return 'act'
        } else {
          return ''
        }
      },
      filter() {
        if (this.filterSelect.length === 0) {
          return 'act'
        } else {
          return ''
        }
      },
      order() {
        if (this.orderSelect.length === 0) {
          return 'act'
        } else {
          return ''
        }
      },
      area() {
        if (this.areaSelect.length === 0) {
          return 'act'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .v-sort {
    .cond-wrap {
      display: flex;
      .cond {
        width: 25%;
        height: 72px;
        border-right: 1px solid #d4d4d4;
        border-bottom: 1px solid #e7eff5;
        background: #fff;
        line-height: 72px;
        text-align: center;
        font-size: 1.4rem;
        &:last-child {
          border-right: none;
        }
        &.active {
          border-bottom: none;
          background: none;
        }
        .txt {
          color: #888888;
        }
        .icon-triangle-down {
            color: #007FFF;
        }
      }
    }
    .option {
      .area {
        padding: 0 22px;
        .all {
          line-height: 50px;
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: #333;
          &.act {
            color: #007fff;
          }
        }
        .hot {
          border-bottom: 2px solid #007fff;
          padding-bottom: 27px;
          margin-bottom: 27px;
          .label {
            width: 148px;
            height: 52px;
            margin-bottom: 20px;
            line-height: 52px;
            border-radius: 5px;
            color: #fff;
            font-size: 1.6rem;
            background: #007fff;
            text-align: center;
          }
          span {
            padding: 0 16px;
            white-space: nowrap;
            font-size: 1.4rem;
            line-height: 50px;
            &.active {
              background: #007fff;
              border-radius: 2px;
              padding: 2px 16px; 
              font-size: 1.2rem;
              color: #fff;
            }
          }
        }
        .region {
          .label {
            width: 148px;
            height: 52px;
            line-height: 52px;
            border-radius: 5px;
            color: #fff;
            font-size: 1.6rem;
            background: #007fff;
            text-align: center;
          }
          div {
            .label-label {
              display: block;
              width: 132px;
              height: 50px;
              margin: 23px 0 13px 0;
              border: 1px solid #989898;
              border-radius: 3px;
              line-height: 50px;
              font-size: 1.4rem;
              text-align: center;
              font-size: 1.4rem;
            }
            span {
              padding: 0 10px;
              line-height: 40px;
              white-space: nowrap;
              font-size: 1.4rem;
              color: #676767;
              &.active {
                background: #007fff;
                border-radius: 2px;
                padding: 2px 15px; 
                font-size: 1.2rem;
                color: #fff;
              }
            }
          }
        }
      }
      .trade {
        padding: 0 22px;
        .all {
          margin-top: 15px;
          font-size: 1.4rem;
          color: #333;
          line-height: 40px;
          &.act {
            color: #007fff;
          }
        }
        div {
          font-size: 1.4rem;
          color: #333;
          line-height: 40px;
          &:last-child {
            padding-bottom: 15px;
          }
          &.active {
            color: #007fff;
          }
        }
      }
      .filter, .order {
        padding: 0 22px;
        .all {
          margin-top: 15px;
          font-size: 1.4rem;
          color: #333;
          line-height: 50px;
          &.act {
            color: #007fff;
          }
        }
        div {
          font-size: 1.4rem;
          color: #7b7b7b;
          line-height: 50px;
          &:last-child {
            padding-bottom: 15px;
          }
          span {
            padding-left: 40px;
            white-space: nowrap;
            &.active {
              color: #007fff;
            }
          }
        }
      }
    }
  }
</style>
