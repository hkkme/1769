<template>
  <div class="logo">
    <div class="letter-wrapper">
      <div class="letter one">{{ logoSigns.one }}</div>
      <div class="letter two">{{ logoSigns.two }}</div>
      <div class="letter three">{{ logoSigns.three }}</div>
      <div class="letter four">{{ logoSigns.four }}</div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  data() {
      return {
        logoSigns: {
          one: '1',
          two: '7',
          three: '6',
          four: '9',
        },
      };
  },
}

</script>

<style lang="scss" scoped>
  @import '~assets/scss/main.scss';

  .logo {
    width: 110px;
    height: 110px;
    background-image: url("~static/img/logo_bg.svg");
    color: $red;

    &:hover {
      background-image: url("~static/img/logo_bg_hover.svg");
      color: $blue;
    }
  }

  .letter-wrapper {
    left: 28px;
    position: relative;
    top: 74px;
    user-select: none;
    width: 55px;
  }

  .letter {
    display: inline-block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -7px;
    text-align: center;
    user-select: none;
  }

</style>
