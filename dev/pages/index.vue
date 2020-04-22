<template>
  <page>
    <scene view="box">
      Home page
    </scene>
  </page>
</template>

<script>
  export default {
    name: 'HomePage',
    mounted() {
      console.log('page', this.$http)
    },
  }
</script>
