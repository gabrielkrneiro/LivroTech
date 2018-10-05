<template>
  <div>
    <div class="secao1">

      <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <router-link :to="{ name: 'HomePage' }">
              <a class="navbar-item">
                <img src="../../assets/logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="50">
              </a>
            </router-link>
          </div>

          <div class="navbar-menu is-active">
              <div class="navbar-start">
                  <div class="navbar-item search-input">
                      <b-input
                        v-model="filter"
                        placeholder="Procurar."
                        type="search"
                        icon-pack="fas"
                        icon="search"
                        rounded
                      />
                  </div>

              </div>

              <!-- Menu do Usuario -->
              <div class="navbar-end">
                  <menu-usuario
                    :opcoes="opcoesDoMenu"
                    :usuario="usuario"
                    @botaoAtivado="logout()"
                  />
              </div>
              <!-- Menu do Usuario -->

            </div>
        </nav>
    </div>

    <!-- div inferior -->
    <div class="secao2">
      <menu-aside
        class="is-pulled-left"
      />

      <section>

          <div class="columns is-multiline ">
            <div
              v-for="livro of livrosFiltrados"
              :key="livro.id"
              class="column is-2"
            >
              <card
                :livro="livro"
              />
            </div>
          </div>

      </section>
    </div>

  </div>
</template>

<script>
  // componentes
  import Banner from '../fixed/Banner.vue'
  import bannerAside from '../fixed/bannerAside/BannerAside'
  import menuUsuario from '../fixed/menu/Menu';
  import menuAside from '../fixed/menuAside/MenuAside';
  import card from '../fixed/card/Card';

  //modelos
  import Usuario from '../../models/Usuario.js';

  // services
  import LivroService from '../../services/livro/LivroService';

  export default {
    components: {
      banner: Banner,
      bannerAside,
      menuUsuario,
      menuAside,
      card
    },

    data() {
      return {
        usuario: false,
        livroService: new LivroService(),
        filter: '',
        opcoesDoMenu: [
          {
            label: 'Voltar ao Site',
            icone: 'bars',
            rota: 'HomePage'
          }
        ]
      }
    },

    methods: {
      logout() {
        this.usuario = new Usuario(this.$session.get('usuario'));

        if (this.usuario.email) {
          this.$store.dispatch('deslogarUsuario', this.usuario);
          this.$toast.open({
            type: 'is-success',
            message: 'deslogado com sucesso'
          });
        } else {
          this.$toast.open({
            type: 'is-danger',
            message: 'email está como null ou undefined'
          });
        }
      }
    },

    computed: {
      listaDeLivros() {
        return this.$store.state.livros.livros;
      },

      livrosFiltrados() {
        if (!this.filter) {
          return this.listaDeLivros;
        } else {
          const regExp = new RegExp(this.filter.trim(), 'i');
          return this.listaDeLivros.filter(livro => regExp.test(livro.titulo))
        }
      }


    },

    created() {
      this.usuario = this.$store.state.login.usuario;

      this.livroService
        .pegaTodosOsLivros()
        .then(response => response.data)
        .then(
          livros => {
            this.$store.dispatch('atualizarListaDeLivros', livros);
          }
        )
        .catch(error => console.log(error));
    }

  }
</script>

<style lang="scss" scoped>
    @import './AdminPage.scss';

</style>
