<template>
  <div/>
</template>

<script>
  export default {
    name: 'headTags',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    head() {
      const meta = this.$props.data.items.map(item => {
        return {
          hid: item.name1,
          name: item.name1,
          content: item.content,
        };
      });

      return {
        title: this.$props.data.title,
        meta,
      };
    },
  };
</script>
