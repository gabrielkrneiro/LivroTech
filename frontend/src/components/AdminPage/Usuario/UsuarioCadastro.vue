<template>
  <div>
    <banner
      titulo="Usuarios"
      subtitulo="Cadastro"
      homeLink="UsuarioHome"
    />

    <formulario
      class="container div-formulario"
      :usuario='usuario'
      @botaoAtivado="salvar()"
    />
  </div>
</template>

<script>
  import formulario from './form';
  import banner from '../../fixed/Banner';
  import Usuario from '../../../models/Usuario.js'
  import UsuarioService from '../../../services/usuario/UsuarioService.js';

  export default {
    components: {
      formulario,
      banner
    },

    data() {
      return {
        usuario: new Usuario(),
        usuarioService: new UsuarioService()
      }
    },

    methods: {
      salvar() {
        this.usuarioService
          .salvar(this.usuario)
          .then(response => response.data)
          .then(usuario => {
            this.$toast.open({
              message: 'Usuário salvo com sucesso.',
              type: 'is-success'
            });
            this.$router.push({ name: 'UsuarioHome' });
          })
          .catch(error => {
            this.$toast.open({
              message: 'Não foi possível salvar o usuário',
              type: 'is-danger'
            });
          });
      }
    }

  }
</script>
