<template>
 <div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group
        v-on:enter="enter"
        v-on:afterEnter="afterEnter"
      tag="div">
      <div v-for="ball in balls" v-show="ball.show" class="ball" :key="ball">
        <div class="inner inner-hook"></div>
      </div>
      </transition-group>
    </div>
    <transition name="fold">
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref=listContent>
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name="fade">
  <div class="list-mask" @click="listHide" v-show="listShow"></div>
  </transition>
 </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送';
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return '还差￥' + diff + '元起送';
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, { click: true });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(x, y) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = false; // 未实现效果
            ball.x = x;
            ball.y = y;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      enter(el, done) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let x = -ball.x;
            let y = ball.y + 710;
            console.log(x, y);
            el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
          }
        }
      },
      afterEnter(el) {
        console.log('dddd');
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      listHide() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .shopcart>.content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }
  .content-left {
    flex: 1;
  }
  .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .logo-wrapper .logo {
    background: #2b343c;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
  }
  .logo-wrapper.highlight .logo {
    background: rgb(0, 160, 220);
  }
  .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }
  .logo-wrapper .logo .icon-shopping_cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }
  .logo-wrapper.highlight .logo .icon-shopping_cart {
    color: #fff;
  }
  .content-left .price {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
  }
  .content-left .price.highlight {
    color: #fff;
  }
  .content-left .desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }
  .content-right {
    flex: 0 0 105px;
    width: 105px;
    color: rgba(255, 255, 255, 0.4);
  }
  .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background: #2b333b;
  }
  .content-right .pay.not-enough {
    background: #2b333b;
  }
  .content-right .pay.enough {
    background: #00b43c;
    color: #fff;
  }
  .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 2s linear;
  }
  .ball-container .ball .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 2s linear;
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transition: all 0.5s;
    transform: translate3d(0, -100%, 0);
  }
  .fold-enter {
    transform: translate3d(0, 0%, 0);
  }
  .fold-leave {
    transform: translate3d(0, 100%, 0);
  }
  .fold-leave-active {
    transform: translate3d(0, 0%, 0);
  }
  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  }
  .list-header .title {
    float: left;
    font-size: 14px;
    color: rgba(7, 17, 27);
  }
  .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }
  .list-content {
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
  }
  .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  }
  .list-content .food .name {
    line-height: 24px;1
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 0;
  }
  .list-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    transition: all 0.5s;
  }
  .fade-enter {
    opacity: 0
  }
  .fade-leave {
    background: rgba(7, 17, 27, 0.6);
  }
  .fade-leave-active {
    background: rgba(7, 17, 27, 0);
  }
</style>
