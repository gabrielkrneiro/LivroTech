<template>
  <div>
      <banner
      :tabs="tabs"
      titulo="Usuarios"
      subtitulo="Home"
    />

    <section class="container section">

        <div class="columns is-multiline">
          <div
            v-for="(usuario, index) of usuarios"
            :key="index"
            class="column is-3"
          >
          <card
            :objeto="usuario"
            linkDeAtualizacao="UsuarioAtualizar"
            @botaoAtivado="remover"
          />
          </div>
        </div>

      </section>
  </div>
</template>

<script>
  import banner from '../../fixed/Banner';
  import card from '../../fixed/cardDeLista/CardDeLista'
  import UsuarioService from '../../../services/usuario/UsuarioService.js';


  export default {
    components: {
      banner,
      card
    },

    data() {
      return {
        tabs: [
          {
            rota: 'UsuarioCadastro',
            label: 'Cadastrar'
          }
        ],
        usuarios: [],
        usuarioService: new UsuarioService()
      }
    },

    methods: {
      remover(usuario) {
        this.usuarioService
          .remover(usuario)
          .then(() => {
            const idx = this.usuarios.indexOf(usuario);
            this.usuarios.splice(idx, 1);
            this.$toast.open({
                message: 'Usuário removido com sucesso',
                type: 'is-success'
              })
          })
          .catch(error => {
            this.$toast.open({
              message: "Não foi possível remover o usuário",
              type: 'is-danger'
            })
          });
      }
    },

    created() {
      this.usuarioService.listarUsuarios()
        .then(response => response.data)
        .then((usuarios) => this.usuarios = usuarios)
        .catch(error => console.log(error.message));
    },
  }
</script>
