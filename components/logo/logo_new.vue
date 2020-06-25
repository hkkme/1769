<template>
  <div class="logo">
    <div class="triangle-outer">
      <div class="triangle-inner">
        <div
          v-if="showInner"
          class="inner"
          :style="{ left: innerLeft + 'px' }"
        >
          <div class="letter one">{{ logoSigns.one }}</div>
          <div class="letter two">{{ logoSigns.two }}</div>
          <div class="letter three">{{ logoSigns.three }}</div>
          <div class="letter four">{{ logoSigns.four }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  created() {
    this.innerLeft = this.animationSteps[0].left;
    this.setAnimationStep();
    this.showInner = true;
  },
  data() {
      return {
        showInner: false,
        logoSigns: {
          one: '1',
          two: '7',
          three: '6',
          four: '9',
        },
        wait: 3000,
        animationStep: 1,
        animationSteps: [
          { text: '1769', left: -30, },
          { text: ' off', left: -33, },
          { text: 'grid', left: -34, },
          { text: ' tec', left: -30, },
          { text: ' lab', left: -29, },
          { text: '1769', left: -30, },
        ],
        innerLeft: null,
      };
  },
  methods: {
    setLogoText(el, sign){
      this.logoSigns[el.substr(1)] = sign;
    },
    setAnimationStep(){

      this.animes = [];

      this.wait = this.animationStep === this.animationSteps.length - 1 ? 6000 : 1500;

      setTimeout(() => {
        const fromArr = this.animationSteps[this.animationStep-1].text.split('');
        const toArr = this.animationSteps[this.animationStep].text.split('');

        this.animation1('.one',fromArr[0],toArr[0]);
        this.animation1('.two',fromArr[1],toArr[1]);
        this.animation1('.three',fromArr[2],toArr[2]);
        this.animation1('.four',fromArr[3],toArr[3]);

        this.setAnimationStep();
        this.animationStep += 1;

        if (this.animationStep === this.animationSteps.length) {
          this.animationStep = 1;
        }
      }, this.wait);


    },
    animation1(el,from,to) {
      const duration = 500;
      const degree = 720;
      const animation2 = this.animation2;

      if (process.browser) {
        this.setLogoText(el, from);

        anime({
          targets: '.letter',
          rotate: [0, degree + 180],
          duration,
          easing: 'easeInExpo',
          // delay: 1000,
          complete: function() {
            animation2(el,from,to);
          },
        });

      }

    },
    animation2(el,from,to) {
      this.setLogoText(el, to);

      const duration = 250;
      const degree = 720;
      const setAnimationStep = this.setAnimationStep;
      this.innerLeft = this.animationSteps[this.animationStep-1].left;

      if (process.browser) {
        anime({
          targets: '.letter',
          rotate: 180,
          duration,
          rotate: [0, degree],
          easing: 'easeOutExpo',
          complete: function() {

          },
        });

      }
    },
  }
}

</script>

<style lang="scss" scoped>
  .logo {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 110px;
    height: 110px;
  }

  .triangle-outer {
    width: 0;
    height: 0;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    border-bottom: 100px solid blue;
    cursor: pointer;
  }

  .triangle-inner {
    position: relative;
    top: 3px;
    left: -50px;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 96px solid white;
  }

  .inner {
    position: relative;
    top: 64px;
    left: -32px;
    transition: 0.2s;
    width: 61px;
    height: 20px;
  }

  .letter {
    display: inline-block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 36px;
    font-weight: 300;
    text-align: center;
    color: blue;
    letter-spacing: -10px;
  }

</style>
