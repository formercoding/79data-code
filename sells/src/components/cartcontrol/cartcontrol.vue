<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) { // 是否为自身派发
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        let rect = event.target.getBoundingClientRect();
        let x = rect.left - 32;
        let y = -(window.innerHeight + rect.top - 22);
        console.log(x, y);
        this.$emit('drop', x, y);
      },
      decreaseCart(event) {
        if (!event._constructed) { // 是否为自身派发
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cartcontrol {
    font-size: 0;
  }
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
  }
  .cart-decrease {
    opacity: 1;
    transform: translate3D(0, 0, 0)rotate(0);
  }
  .cart-decrease.move-enter {
    opacity: 0;
    transform: translate3D(24px, 0, 0)rotate(180deg);
  }
  .cart-decrease.move-leave-active {
    opacity: 0;
    transform: translate3D(24px, 0, 0)rotate(180deg);
  }
  .cart-decrease .inner {
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    transition: all 0.4 linear;
    transform: rotate(0);
  }
  .cart-decrease.move-leave .inner {
    transform: rotate(180deg);
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
     font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }
</style>
