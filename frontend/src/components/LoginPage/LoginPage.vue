<template>
  <div>

    <banner
      v-if="existeErro"
      titulo="Erro"
      :subtitulo="this.$store.state.login.error.message"
      class="is-danger"
    />

    <banner
      v-else
      titulo="Login"
      class="is-info"
    />

    <formulario
      :usuario="usuario"
      class="container div-formulario"
      @botaoAtivado="logar"
    />
  </div>
</template>

<script>
  import banner from '../fixed/Banner';
  import formulario from './form';
  import Usuario from '../../models/Usuario';

  export default {
    components: {
      banner,
      formulario,
    },

    data() {
      return {
        titulo: 'Login',
        usuario: new Usuario({ email: 'admin@gmail.com', senha: '0000' })
      };
    },

    computed: {
      existeErro() {
        return this.$store.getters.existeErroNoLogin;
      }
    },

    methods: {
      logar() {
        this.$store.dispatch('logarUsuario', this.usuario).then(
          () => {
            if (!this.existeErro) {
              this.$toast.open({
                type: 'is-success',
                message: 'usuário logado com sucesso'
              });
            }
        });
      },
    },
  };
</script>

