<template>
  <section id="footer" class="section has-green-bg">
    <div class="container has-text-centered">
      <a href="https://twitter.com/hellobetkowski" class="is-size-4 social-link">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://github.com/hellobetkowski" class="is-size-4 social-link">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://dev.to/betkowski" class="is-size-4 social-link">
        <i class="fab fa-dev"></i>
      </a>
      <p class="has-text-white is-size-7">
        Built with <i class="fas fa-heart"></i> and <a href="https://bulma.io">Bulma</a>, by
        <a href="https://twitter.com/hellobetkowski">@hellobetkowski</a>
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TheFooter',
  }
</script>

<style scoped>
  #footer p {
    padding: 20px;
  }

  #footer a {
    color: #ffffff !important;
  }
</style>
