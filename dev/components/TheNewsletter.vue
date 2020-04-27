<template>
  <section id="newsletter" class="section">
    <div class="container">
      <h3 class="is-size-3">
        Newsletter or Call to Action
      </h3>
      <p class="has-text-green">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum.
      </p>
      <div class="field newsletter-field">
        <div class="control">
          <input class="input newsletter-input" type="text" placeholder="mail@example.com" />
        </div>
      </div>
      <button class="btn has-mustard-bg is-size-7 a-menu">
        sign up now
      </button>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TheNewsletter',
  }
</script>

<style scoped>
  #newsletter {
    text-align: center;
  }

  #newsletter p {
    width: 600px;
    margin: 0 auto;
  }

  .social-link {
    padding: 15px;
    color: #ffffff !important;
  }

  .newsletter-input {
    border: none;
    border-bottom: 2px solid #1e4132;
    border-radius: 0% !important;
    box-shadow: none;
    text-align: center;
  }

  #newsletter .field {
    width: 400px;
    max-width: 80%;
    padding: 20px;
    margin: 0 auto;
  }
</style>
