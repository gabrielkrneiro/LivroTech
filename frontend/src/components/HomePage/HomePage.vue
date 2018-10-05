<template>
  <section>

    <div
      v-if="error.message"
      class="has-text-centered error-message has-background-danger"
    >
      <span class="title is-size-1 has-text-white"> {{ error.message }} </span>
    </div>

    <section
      v-else
    >
      <div
        class="hero is-primary is-bold"
      >
        <div
          class="hero-body"
        >

          <div
            class="container"
          >
            <h1 class="title is-pulled-left">Bem Vindo!</h1>

            <div class="is-pulled-right">
              <router-link
                v-if="!this.usuario"
                :to="{ name: 'LoginPage' }"
              >
                <span
                  class="has-text-white"
                >Login</span>
              </router-link>

              <menu-usuario
                v-else
                :opcoes="opcoesDoMenu"
                :usuario="usuario"
                @botaoAtivado="logout()"
              />

            </div>

          </div>
        </div>
      </div>
      <b-field
        v-if="!filter"
        position="is-centered"
      >
        <b-input
          v-model="filter"
          class="input-search"
          placeholder="Procure seu livro."
          custom-class="isc1"
        />

      </b-field>

      <b-field
        v-else
        position="is-centered"
      >
        <b-input
          v-model="filter"
          class="input-search"
          placeholder="Procure seu livro."
          custom-class="isc2"
        />

      </b-field>

      <div
        class='container'
      >

        <div
          class="columns is-multiline"
          :class="{ 'is-centered': filter }"
        >
          <div
            class="column is-one-fifth is-2"
            v-for="livro of filteredBooks"
            :key="livro.id"
          >
            <card
              :livro='livro'
            />
          </div>

        </div>
      </div>
    </section>

  </section>
</template>

<script>
  import LivroService from '../../services/livro/LivroService.js';
  import card from '../fixed/card/Card';
  import Usuario from '../../models/Usuario.js';
  import menuUsuario from '../fixed/menu/Menu';

  export default {
    components: {
      card,
      menuUsuario
    },

    data() {
      return {
        filter: '',
        livros: '',
        livroService: new LivroService(),
        error: '',
        usuario: false,
        opcoesDoMenu: [],
      };
    },

    computed: {

      nocover() {
        return this.$store.state.livros.nocover;
      },

      filteredBooks() { // filtering books
        if (this.filter) {
          const exp = new RegExp(this.filter.trim(), 'i');
          return this.livros.filter(livro => exp.test(livro.titulo));
        }
          return this.livros;
      },
    },

    created() {
      this.livroService.pegaTodosOsLivros()
        .then(res => res.data)
        .then(livros => this.livros = livros)
        .catch(error => this.error = error);

      if (this.$session.exists()) {
        this.usuario = new Usuario(this.$session.get('usuario'));
        this.pegaOPerfilDoUsuario();
        this.configuraMenuDoUsuarioSegundoOPerfil();
      }
    },

    methods: {

      pegaOPerfilDoUsuario() {

        this.usuario
          .buscaUsuarioPorEmail()
          .then(response => response.data)
          .then(usuario => {
            this.usuario.perfil = usuario.perfil.nome;
            this.configuraMenuDoUsuarioSegundoOPerfil();
          })
          .catch( error => this.$toast.open({
            message: 'Usuário nao existe',
            type: 'is-danger'
          }));
      },

      configuraMenuDoUsuarioSegundoOPerfil() {

        switch (this.usuario.perfil) {

          case 'Administrador':
            this.opcoesDoMenu = [
              {
                rota: 'AdminPage',
                label: 'Painel de Controle',
                icone: 'bars'
              }
            ]
            break;
        }
      },

      logout() {

        if (this.usuario.email) {
          this.$store.dispatch('deslogarUsuario', this.usuario);
          this.usuario = false;
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
    }

  };
</script>

<style scoped>
@import './HomePage.scss'
</style>
