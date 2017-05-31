<template>
  <div class="v-aboutus">
    <div class="about">
      <span class="title">关于我们</span>
      <p>企搜搜旨在为用户提供快速查询企业工商信息、法院判决信息、关联企业信息、司法拍卖信息、失信信息、被执行人信息、知识产权信息、公司新闻、招聘信息等服务。通过多模式查询，多选项筛选，让查询结果更准确，查询内容更详尽！是泛金融，泛投资，泛法律和泛商务（如销售、采购）相关人士的首选工具！</p>
    </div>
    <div class="contact">
      <span class="title">联系我们</span>
      <span>QQ：1397047887</span>
      <span>邮箱：qijiu@163.com</span>
      <span>网址：www.qisoso.com</span>
    </div>
    <v-footer :currentIndex='2'></v-footer>
  </div>
</template>
<script>
import vFooter from 'components/footer/footer'
export default {
  components: {
    vFooter
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.v-aboutus {
  .about {
    margin-top: 45px;
    padding: 0 20px;
    color: #676767;
    .title {
      display: block;
      padding-bottom: 25px;
      border-bottom: 1px solid #656565;
      font-size: 1.6rem;
    }
    p {
      margin-top: 10px;
      line-height: 35px;
      text-indent: 40px;
      font-size: 1.2rem;
    }
  }
  .contact {
    margin-top: 35px;
    padding: 0 20px;
    color: #676767;
    .title {
      display: block;
      margin-bottom: 10px;
      padding-bottom: 25px;
      border-bottom: 1px solid #656565;
      font-size: 1.6rem;
    }
    span {
      display: block;
      line-height: 35px;
      font-size: 1.2rem;
    }
  }
}
</style>
