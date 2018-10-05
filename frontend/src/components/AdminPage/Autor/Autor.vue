<template>
  <div>
    <banner
      :tabs='tabs'
      titulo="Autor"
      subtitulo="Home"
    />

    <section class="container section">

      <div class="columns is-multiline">
        <div
          v-for="(autor, index) of autores"
          :key="index"
          class="column is-3"
        >
        <card
          :objeto="autor"
          linkDeAtualizacao="AutorAtualizar"
          @botaoAtivado="remover"
        />
        </div>
      </div>

    </section>
  </div>
</template>

<script>
  import card from '../../fixed/cardDeLista/CardDeLista';
  import banner from '../../fixed/Banner';
  import AutorService from '../../../services/autor/AutorService.js';
  import formulario_autor from './form';
  import Autor from '../../../models/Autor.js'

export default {

  components: {
    banner,
    formulario_autor,
    card
  },
  data() {
    return {
      tabs: [
        {
          rota: 'AutorCadastro',
          label: 'Cadastrar'
        }
      ],
      autores: [],
      autorService: new AutorService(),
      autor: new Autor(),
      columns: [
        {
          field: 'nome',
          label: 'Nome',
          centered: true,
        },
        {
          field: 'acoes',
          label: 'Acoes',
          centered: true
        }
      ],
    };
  },

  created() {
    this.autor = new Autor({id: 1, nome: 'Gabriel'});
    this.renderizaListaDeAutores();
  },

  methods: {
    renderizaListaDeAutores() {
      this.autores = [];
      this.autorService.pegaTodosOsAutores()
        .then(response => response.data)
        .then(autores => {
          autores.forEach(autor => this.autores.push(new Autor(autor)));
        });
    },

    remover(autor) {
      this.autorService
        .removerAutor(autor)
        .then(response => response.data)
        .then(autorRemovido => {
          const idx = this.autores.indexOf(autorRemovido);
          this.autores.splice(idx, 1);
          this.$toast.open({
            message: 'Autor removido com sucesso',
            type: 'is-success'
          })
        })
        .catch(error => {
          this.$toast.open({
            message: "Não foi possível remover o autor",
            type: 'is-danger'
          });
        });
    },

  },
};
</script>

<style lang="scss" scoped>
  @import './Autor.scss'
</style>
