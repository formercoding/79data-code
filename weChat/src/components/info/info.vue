<template>
  <div class="v-info">
    <div class="nav">
      <div class="level-1">
        <span>基本信息</span>
        <span>法律诉讼</span>
        <span>经营状况</span>
        <span>对外投资</span> 
      </div>
      <div class="level-2">
        <span>基本信息</span>
        <span>成员信息</span>
        <span>股东信息</span>
        <span>变更信息</span>
        <span>分支机构</span>
        <span>相关搜索</span>
        <span>所属行业</span>
      </div>
    </div>
    <div class="info-detail">
      <div class="info-base">
        <span class="title">基本信息</span>
        <ul class="info-list">
          <li>
            <span>统一社会信用代码：</span>
            <span>54546546546645</span>
          </li>
          <li>
            <span>注册号：</span>
            <span>54546546546645</span>
          </li>
          <li>
            <span>名称</span>
            <span>小米科技有限公司：</span>
          </li>
          <li>
            <span>机构代码：</span>
            <span>54546546546645</span>
          </li>
          <li>
            <span>经营状态：</span>
            <span>正常主体类型</span>
          </li>
          <li>
            <span>机构类型：</span>
            <span>企业法人</span>
          </li>
          <li>
            <span>登记日期：</span>
            <span>2010-09-09</span>
          </li>
           <li>
            <span>法人代表：</span>
            <span>阿杜</span>
          </li>
           <li>
            <span>注册资本</span>
            <span>2010万元</span>
          </li>
           <li>
            <span>经营期限：</span>
            <span>2010-09-09至2020-02-02</span>
          </li>
          <li>
            <span>登记机关：</span>
            <span>海定分局</span>
          </li>
          <li>
            <span>所属地区：</span>
            <span>海淀区</span>
          </li>
          <li>
            <span>证书有效期：</span>
            <span>2013-03-03至3022-23-23</span>
          </li>
          <li>
            <span>企业地址：</span>
            <span>北京市海定区青中街</span>
          </li>
          <li>
            <span>经营范围：</span>
            <span>手机技术开发；手机市场；手机服务；技术开发；货物进出口；技术净出口</span>
          </li>
        </ul>
      </div>
      <div class="info-holder">
        <span class="title">股东信息</span>
        <ul class="info-list">
          <li>
            <div>
              <span>自然人股东：</span>
              <span>刘德</span>
            </div>
            <div>
              <span>认缴：</span>
              <span>54546.22万元</span>
            </div>
            <div>
              <span>实缴：</span>
              <span>54546.22万元</span>
            </div>
          </li>
          <li>
            <div>
              <span>自然人股东：</span>
              <span>刘德</span>
            </div>
            <div>
              <span>认缴：</span>
              <span>54546.22万元</span>
            </div>
            <div>
              <span>实缴：</span>
              <span>54546.22万元</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-change">
        <span class="title">变更信息</span>
        <ul class="info-list">
          <li>
            <div>
              <span>变更项目：</span>
              <span>经营范围</span>
            </div>
            <div>
              <span>变更前：</span>
              <span>手机技术开发；手机市场；手机服务；技术开发；货物进出口；技术净出口</span>
            </div>
            <div>
              <span>变更后：</span>
              <span>手机技术开发；手机市场；手机服务；技术开发；货物进出口；技术净出口</span>
            </div>
          </li>
          <li>
            <div>
              <span>变更项目：</span>
              <span>注册资本</span>
            </div>
            <div>
              <span>变更前：</span>
              <span>299万</span>
            </div>
            <div>
              <span>变更后：</span>
              <span>1455万</span>
            </div>
          </li>
          <li>
            <div>
              <span>变更项目：</span>
              <span>董事、经理</span>
            </div>
            <div>
              <span>变更前：</span>
              <span>雷军、阿杜</span>
            </div>
            <div>
              <span>变更后：</span>
              <span>阿杜</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="info-branch">
        <span class="title">分支机构</span>
        <ul class="info-list">
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
        </ul>
      </div>
      <div class="info-relate">
        <span class="title">相关搜索</span>
        <ul class="info-list">
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
          <li>
            <span>小米科技有限公司天天见分公司</span>
          </li>
        </ul>
      </div>
      <div class="info-trade">
        <span class="title">所属行业</span>
        <ul class="info-list">
          <li>
            <span>广播</span>
          </li>
          <li>
            <span>会议及艺术</span>
          </li>
        </ul>
      </div>
    </div>
    <v-history></v-history>
    <v-dfooter></v-dfooter>
  </div>
</template>
<script>
import vHistory from 'components/history/history'
import vDfooter from 'components/dfooter/dfooter'
export default {
  components: {
    vHistory,
    vDfooter
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @blue: #007fff;
  .v-info {
    .nav {
      .level-1 {
        display: flex;
        height: 72px;
        background: #fff;
        border-bottom: 1px solid #cdddf3;
        text-align: center;
        line-height: 72px;
        font-size: 1.4rem;
        color: #656565;
        span {
          flex-grow: 1;
        }
      }
      .level-2 {
        padding: 25px 35px 0 35px;
        span {
          display: inline-block;
          width: 110px;
          height: 40px;
          margin-right: 38px;
          margin-bottom: 20px;
          line-height: 40px;
          border-radius: 18px;
          border: 1px solid #9a9a9a;
          text-align: center;
          font-size: 1.2rem;
          color: #656565;
        }
      }
    }
    .info-detail {
      > div {
        margin-bottom: 20px;
        padding: 27px 25px;
        border-bottom: 1px solid #cddcf6;
        background: #fff;
        color: #6f6f6f;
        .title {
          display: inline-block;
          margin-bottom: 43px;
          padding-bottom: 8px;
          font-size: 1.4rem;
          border-bottom: 2px solid @blue;
        }
        li {
          line-height: 40px;
          font-size: 1.2rem;
        }
      }
      .info-base {
        li {
          display: flex;
          span:first-child {
            white-space: nowrap;
          }
        }
      }
      .info-holder, .info-change {
        li {
          margin-bottom: 50px;
          &:last-child {
            margin-bottom: 0;
          }
          div {
            display: flex;
            span:first-child {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
