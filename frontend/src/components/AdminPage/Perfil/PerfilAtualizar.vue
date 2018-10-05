<template>
    <div>
      <banner
        titulo="Perfil"
        subtitulo="Cadastro"
        homeLink="PerfilHome"
      />

      <formulario
        class="container"
        :perfil='perfil'
        @botaoAtivado="salvar()"
      />
    </div>
  </template>

  <script>
    import formulario from './form';
    import banner from '../../fixed/Banner';
    import Perfil from '../../../models/Perfil.js'
    import PerfilService from '../../../services/perfil/PerfilService.js';

    export default {
      components: {
        formulario,
        banner
      },

      data() {
        return {
          perfil: {},
          perfilService: new PerfilService()
        }
      },

      methods: {
        salvar() {
          const perfil = new Perfil(this.perfil);

          this.perfilService
            .salvar(perfil)
            .then(response => response.data)
            .then(perfil => {
              this.$toast.open({
                message: 'Perfil salvo com sucesso.',
                type: 'is-success'
              });
            this.$router.push({ name: 'PerfilHome' });
          })
          .catch(error => {
            this.$toast.open({
              message: 'Não foi possível salvar o perfil',
              type: 'is-danger'
            });
          });
        }
      },

      created() {
        const perfil_id = this.$route.params.id;
        this.perfilService
          .pegarPerfil(perfil_id)
          .then(response => response.data)
          .then(perfil => this.perfil = perfil)
          .catch(error => console.log(error.message));
      }

    }
  </script>
