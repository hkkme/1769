<template>
  <div class="simple-raw-html">
    <div
      class="simple-raw-html-title"
      :style="{ paddingTop: spaceTop + 'px' }"
    >{{ data.title }}</div>
    <div
      class="simple-raw-html-paragraph"
      v-for="(item, index) in data.paragraphs"
      :key="index"
      v-html="item"
    />
    <div
      class="bottom-space"
      :style="{ paddingBottom: spaceBottom + 'px' }"
    />
  </div>
</template>

<script>
  export default {
    name: 'simpleText',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        spaceTop: 0,
        spaceBottom: 0,
      }
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        const spaceTop = this.$props.data.spaceTop === null ? 0 : this.$props.data.spaceTop;
        const spaceBottom = this.$props.data.spaceBottom === null ? 0 : this.$props.data.spaceBottom;

        this.spaceTop = window.innerWidth > 1300 ? spaceTop : 0;
        this.spaceBottom = window.innerWidth > 1300 ? spaceBottom : 0;
      },
    },
  };
</script>

<style lang="scss">
  @import '~assets/scss/main.scss';

  .simple-raw-html {
    margin: 0 auto;
    max-width: 1000px;
    width: calc(100% - 20px);

    &-title {
      color: $blue;
      font-family: 'Alata', sans-serif;
      font-size: 104px;
      letter-spacing: -6px;
      padding: 5px 0;
    }
    &-paragraph {
      font-family: 'Courier Prime', monospace;
      font-size: 24px;
      margin: 10px 0 20px 0;
      padding: 0 0 0 5px;
      text-transform: lowercase;
    }
  }

  .simple-raw-html-paragraph {
    a:link {
      color: $red;
      text-decoration: none;
    }
    a:active {
      color: $red;
    }
    a:visited {
      color: $red;
    }
    a:hover {
      background-color: $red;
      color: white;
    }
  }

  .bottom-space {
    width: 100%;
  }

  @media only screen and (max-width: 1300px) {

    .simple-raw-html {
      margin: 0 auto;
      &-title {
        font-size: 60px;
      }
      &-paragraph {
        font-size: 16px;
        margin: 5px 0 10px 0;
      }
    }
  }

</style>
