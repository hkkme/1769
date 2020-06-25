<template>
 <div class="navmob">
  <div
    class="navmob-items"
    v-for="(item, index) in navmapJson.nodes"
    :key="index"
  >
    <div
      class="navmob-item"
      :style="{ backgroundColor: item.color }"
      @click="goTo(item.slug)"
    >{{ item.label }}</div>
  </div>
 </div>
</template>

<script>
  import navmapJson from "~/static/json/navmap.json";

  export default {
    components: {
    },
    created() {
      this.navmapJson = navmapJson;
    },
    data: () => ({
      data: {
        navmapJson: null,
      },
    }),
    methods: {
      goTo(slug) {
        this.$router.push(slug);
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import '~assets/scss/main.scss';

  .navmob {
    background-color: white;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;

    &-item {
      border-radius: 10px;
      color: $blue;
      cursor: pointer;
      float: left;
      font-family: 'Courier Prime', monospace;
      font-size: 25px;
      margin: 7px;
      padding: 7px;
      &::selection {
        background: transparent;
        color: $red;
      }
      -webkit-tap-highlight-color: rgba(0,0,0,0);

      &:hover {
        color: $red;
      }
    }
  }
</style>>
