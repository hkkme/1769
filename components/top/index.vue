<template>
    <div class="top">
      <div
        @click="goTo()"
        class="logo-wrapper"
      >
        <logo/>
      </div>
      </div>
    </div>
</template>

<script>
  import logo from "~/components/logo";

  export default {
    components: {
      logo,
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize)
    },
    data: () => {
      return {
        nav: '/navmap',
      }
    },
    methods: {
      goTo() {
        this.$router.push(this.nav);
      },
      handleResize() {
        this.nav = window.innerWidth > 1300 ? '/navmap' : '/navmob';
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/main.scss';

.top {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
}

.logo {
  cursor: pointer;
  height: 110px;
  left: 10px;
  margin: 10px 0 10px 10px;
  top: 10px;
  width: 110px;
}

  @media only screen and (max-width: 1300px) {

  .top {
    z-index: 100;
    background-color: white;
  }

  .logo-wrapper {
    height: 110px;
    width: 110px;
  }

  .logo {
    height: 110px;
    margin: 0;
    top: 0;
    width: 110px;
  }

  .navmap {
    height: 110px;
    margin: 0;
    width: 110px;
  }

}

</style>
