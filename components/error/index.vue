<template>
  <div class="error">
    <div class="error-title">404</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~assets/scss/main.scss';

  .error {
    margin: 0 auto;
    max-width: 1000px;
    width: calc(100% - 20px);

    &-title {
      color: $blue;
      font-family: 'Alata', sans-serif;
      font-size: 200px;
      letter-spacing: -6px;
      margin: 0 auto;
      padding-top: 120px;
      text-align: center;
    }

  @media only screen and (max-width: 1300px) {

    .error {
      &-title {
        font-size: 100px;
        padding-top: 20px;
      }
    }
  }

  }

</style>
