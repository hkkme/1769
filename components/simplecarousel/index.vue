<template>
  <div class="simple-carousel">
    <client-only>
      <carousel
        :per-page="1"
        :mouse-drag="true"
        :autoplay="true"
        :loop="true"
        :autoplayTimeout="3000"
        :paginationPosition="'bottom-overlay'"
        :paginationColor="'#ccc'"
        :paginationActiveColor="'#fff'"
      >
        <slide
          v-for="(image, index) in data.images"
          :key="index"
        >
          <div class="simple-carousel-content">
            <img :src="image.img.url">
          </div>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: 'simpleCarousel',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    computed: {
      customMargin() {
        const bottomMargin = this.$props.data.marginbottom === null ? 100 : this.$props.data.marginbottom;
        return {
          'margin-bottom': `${bottomMargin}px`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .simple-carousel {
    margin: 0 auto;
    max-width: 1000px;
    width: calc(100% - 20px);
    padding: 5px 0;
    cursor: grab;

    &-content img {
      width: 100%
    }

  }
</style>
