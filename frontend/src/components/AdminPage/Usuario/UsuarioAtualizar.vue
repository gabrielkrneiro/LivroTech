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
          usuario: {},
          usuarioService: new UsuarioService()
        }
      },

      methods: {
        salvar() {
          const usuario = new Usuario(this.usuario);

          this.usuarioService
            .salvar(usuario)
            .then(usuario => {
              this.$toast.open({
                message: 'Usuário salvo com sucesso.',
                type: 'is-success'
              })
              this.$router.push({ name: 'UsuarioHome' })
            })
            .catch(error => {
              this.$toast.open({
                message: 'Não foi possível salvar o usuário',
                type: 'is-danger'
              })
            });
        }
      },

      created() {
        const usuario_id = this.$route.params.id;
        this.usuarioService
          .pegarUsuario(usuario_id)
          .then(response => response.data)
          .then(usuario => this.usuario = usuario)
          .catch(error => console.log(error.message));
      }

    }
  </script>
