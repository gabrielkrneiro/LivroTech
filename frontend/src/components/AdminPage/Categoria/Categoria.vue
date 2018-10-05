<template>
  <div>
    <banner
      :tabs="tabs"
      titulo='Categorias'
      subtitulo="Home"
    />

    <section class="container section">

      <div class="columns is-multiline">
        <div
          v-for="(categoria, index) of categorias"
          :key="index"
          class="column is-3"
        >
        <card
          :objeto="categoria"
          linkDeAtualizacao="CategoriaAtualizar"
          @botaoAtivado="remover"
        />
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import banner from '../../fixed/Banner';
import CategoriaService from '../../../services/categoria/CategoriaService.js'

// components
import card from '../../fixed/cardDeLista/CardDeLista';


export default {
  components: {
    banner,
    card
  },

  data() {
    return {
      categoriaService: new CategoriaService(),
      categorias: [],
      tabs: [
        {
          rota: 'CategoriaCadastro',
          label: 'Cadastrar',
        }
      ],
    }
  },

  methods: {
    remover(categoria) {
      this.categoriaService
        .remover(categoria)
        .then(response => response.data)
        .then(categoria => {
          const idx = this.categorias.indexOf(categoria);
          this.categorias.splice(idx, 1);
          this.$toast.open({
            message: "categoria removida com sucesso",
            type: 'is-success'
          })
        })
        .catch(error => {
          this.$toast.open({
            message: "Não foi possível remover a categoria",
            type: 'is-danger'
          })
        });
    },
  },

  created(){
    this.categoriaService
      .listaDeCategorias()
      .then(response => response.data)
      .then(categorias => this.categorias = categorias)
      .catch(error => console.log(error.message));
  }
}
</script>

<style lang="scss" scoped>

</style>
