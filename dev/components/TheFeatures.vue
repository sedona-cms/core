<template>
  <section id="features" class="section has-mustard-bg">
    <div class="container">
      <div class="columns reverse-row-order">
        <div class="column">
          <h3 class="is-size-3">
            Open Source, all the way
          </h3>
          <p class="has-text-green paragraph">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </p>
        </div>
        <div class="column">
          <img class="feature-img" src="~/assets/img/feature1.png" alt="feature" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <img class="feature-img" src="~/assets/img/feature2.png" alt="feature" />
        </div>
        <div class="column">
          <h3 class="is-size-3">
            Second Exciting Feature
          </h3>
          <p class="has-text-green paragraph">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns reverse-row-order">
        <div class="column">
          <h3 class="is-size-3">
            Third Feature, Wow
          </h3>
          <p class="has-text-green paragraph">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </p>
        </div>
        <div class="column">
          <img class="feature-img" src="~/assets/img/feature3.png" alt="feature" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TheFeatures',
  }
</script>

<style scoped>
  .feature-img {
    max-width: 60%;
    margin: 0 auto;
  }

  .column {
    display: flex;
    justify-content: center;
    flex-flow: column;
    text-align: center;
  }

  .column h3,
  .column p {
    align-self: center;
  }

  @media (max-width: 1024px) {
    .reverse-row-order {
      flex-direction: column-reverse;
      display: flex;
    }
  }
</style>
