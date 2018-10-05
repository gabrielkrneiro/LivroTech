<template>
    <div>
        <banner
        :tabs="tabs"
        titulo="Perfil"
        subtitulo="Home"
      />

      <section class="container section">

          <div class="columns">
            <div
              v-for="(perfil, index) of perfis"
              :key="index"
              class="column is-3"
            >
            <card
              :objeto="perfil"
              linkDeAtualizacao="PerfilAtualizar"
              @botaoAtivado="remover"
            />
            </div>
          </div>

        </section>
    </div>
  </template>

  <script>
    import banner from '../../fixed/Banner';
    import PerfilService from '../../../services/perfil/PerfilService.js';

    // componentes
    import card from '../../fixed/cardDeLista/CardDeLista';


    export default {
      components: {
        banner,
        card
      },

      data() {
        return {
          tabs: [
            {
              rota: 'PerfilCadastro',
              label: 'Cadastrar'
            }
          ],
          perfis: [],
          perfilService: new PerfilService()
        }
      },

      methods: {
        remover(perfil) {
          this.perfilService
            .remover(perfil)
            .then(() => {
              const idx = this.perfis.indexOf(perfil);
              this.perfis.splice(idx, 1);
              this.$toast.open({
                message: "Perfil removido com succeso",
                type: 'is-success'
              })
            })
            .catch(error => {
              this.$toast.open({
                message: "Não foi possível remover o perfil",
                type: 'is-danger'
              })
            });
        }
      },

      created() {
        this.perfilService.listarPerfis()
          .then(response => response.data)
          .then((perfis) => this.perfis = perfis)
          .catch(error => console.log(error.message));
      },
    }
  </script>
