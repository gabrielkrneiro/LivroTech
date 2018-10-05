<template>
  <div>
    <banner
      :tabs="tabs"
      titulo="Livros"
      subtitulo="Home"
    />

    <section class="container">

      <b-table
        :data="livros"
      >
        <template slot-scope="props">

          <b-table-column
            field="capa"
            label="capa"
          >
            <img
              :src="props.row.capa"
              :alt="props.row.titulo"
              class="image is-96x96"
              @error="imgError(props.row)"
            >
          </b-table-column>

          <b-table-column
            field='titulo'
            label='Titulo'
          >{{ props.row.titulo }}</b-table-column>

          <b-table-column
            field='descricao'
            label='Descricao'
          >{{ descricaoDoLivro(props) }}</b-table-column>

          <!-- Todo: somente incluir categoria depois de integrar Vuex -->
          <!-- <b-table-column
            field="categoria"
            label="Categoria"
          >
            <span
              v-for="(categoria, index) of props.row.categoria"
            >
              {{ categoria.nome }}<br>
            </span>
          </b-table-column> -->

          <b-table-column
            field='autor'
            label='Autor'
          >{{ props.row.autor.nome }}</b-table-column>

          <b-table-column
            field='acoes'
            label='Ações'
          >
            <router-link :to="{ name: 'LivroAtualizar', params : { id: props.row.id }}">
            <a class="button is-info">
              <b-icon
                pack="fas"
                icon="edit"
              />
            </a>
            </router-link>

            <button
              class="button is-danger"
              @click.prevent="remover(props.row)"
            >
              <b-icon
                pack="fas"
                icon="trash"
              />
            </button>

          </b-table-column>

        </template>
      </b-table>

    </section>

    <!-- <img :src="nocover" alt=""> -->

  </div>
</template>

<script>
  import LivroService from '../../../services/livro/LivroService.js';
  import banner from '../../fixed/Banner';
  import Livro from '../../../models/Livro.js';

  export default {

    components: {
      banner,
    },

    data() {
        return {
            livros: [],
            livroService: new LivroService(),
            tabs: [
              {
                rota: 'LivroCadastro',
                label: 'Cadastrar'
              }
            ],
        };
    },

    methods: {

      imgError(livro) {
        livro.capa = this.$store.state.livros.nocover;
      },

      removeLivroDaLista(livro) {
        const idx = this.livros.indexOf(livro);
        this.livros.splice(idx, 1);
      },

      remover(livro) {

        this.$dialog.confirm({
          message: 'Confirma excluir esse livro?',
          onConfirm: () => {
            this.livroService.remover(livro)
            .then(response => response.data)
            .then(() => {
              this.removeLivroDaLista(livro);
              this.$toast.open({
                message: "Livro removido com sucesso",
                type: 'is-success'
              })
            })
            .catch(error => {
              this.$toast.open({
                message: "Não foi possível remover o livro",
                type: 'is-danger'
              })
            });
          }
        })
      },

      descricaoDoLivro(props) {
        return props.row.descricao.length < 30 ?
          props.row.descricao :
          props.row.descricao.slice(0, 30) + '...';
      }
    },

    created() {
      this.livroService.pegaTodosOsLivros()
        .then(response => response.data)
        .then((livros) => this.livros = livros)
        .catch(error => console.log(error.message));
    },
  };
</script>

<style lang="scss" scoped>

</style>

