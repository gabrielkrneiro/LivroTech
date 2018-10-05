<template>
  <div
    class="hero is-info"
  >
    <div
      class="hero-body"
    >

      <div
        class="container is-pulled-left"
      >
        <h1 class="title">{{ titulo }}</h1>

        <router-link
          v-if="subtitulo == 'Home'"
          :to="{ name: 'AdminPage' }"
        >
            <h1 class="subtitle">Home</h1>
          </router-link>

        <h2 v-else class="subtitle">{{ subtitulo }}</h2>

        <div class="icon">
          <b-icon
            pack="fas"
            type="trash"
          />
        </div>

      </div>

      <div
        v-if="homeLink"
        class="is-pulled-right"
      >
        <router-link :to="{ name: homeLink }">
          <b-icon
            pack="fas"
            icon="home"
            size="is-large"
            type="is-white"
          />
        </router-link>
      </div>

    </div>

    <!-- footer  -->
    <div
      v-if="tabs"
      class="hero-foot"
    >
      <nav class="tabs">
        <div class="container">
          <ul>
            <li
              v-for="(tab, index) of tabs"
              :key="index"
            >
              <router-link :to="{ name: tab.rota }">
                {{ tab.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import bannerAside from './bannerAside/BannerAside'

  export default {
    components: {
      bannerAside
    },

    props: {
      homeLink: {
        require: false,
        type: String,
        default: ""
      },
      titulo: {
        require: true,
        type: String,
        default: ""
      },
      subtitulo: {
        require: false,
        type: String,
        default: ""
      },
      tabs: {
        require: false,
        type: Array,
        default: () => new Array()
      }
    }
  }
</script>
