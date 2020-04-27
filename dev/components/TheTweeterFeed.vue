<template>
  <section id="twitter-feed" class="section has-white-mustard-gradient">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="~assets/img/twitter-profile-guy.jpg" alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Some guy</strong> <small>@someguy</small> <small>5m</small>
                    <br />
                    Frist time I used @fancyapp, was like the first time I listened to The Beatles.
                    Christmas came early, I guess.
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="retweet">
                      <span class="icon is-small">
                        <i class="fas fa-retweet" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="~assets/img/twitter-profile-girl.jpg" alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Some girl</strong> <small>@somegirl</small> <small>5m</small>
                    <br />
                    Fancy App is the answer to all your problems, all praise the #fancyappgod!
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="retweet">
                      <span class="icon is-small">
                        <i class="fas fa-retweet" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
      <p class="is-size-7 has-text-centered">See more at #fancyapp</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TheTweeterFeed',
  }
</script>

<style scoped>
  #twitter-feed .columns {
    margin: 0px;
  }
  @media (max-width: 1024px) {
    margin: 0px 10px;
  }

  .box {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .box .icon {
    margin-top: -10px;
    color: #fdbb34 !important;
    transition: color 0.5s ease;
  }

  .box .icon:hover {
    color: #1e4132 !important;
  }
  #twitter-feed .container .is-size-7 {
    padding: 20px;
  }
</style>
