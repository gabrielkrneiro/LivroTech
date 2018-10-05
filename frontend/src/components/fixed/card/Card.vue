<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by5">
        <img :src="livro.capa" alt="Placeholder image" @error="imgError(livro)">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-6">{{ tituloFormatado }}</p>
      <p class="subtitle is-6">{{ livro.autor.nome }}</p>
    </div>
  </div>
</div>

</template>

<script>
  import Livro from '../../../models/Livro.js';

  export default {
    props: {
      livro: {
        required: true,
        type: Object,
        default: () => new Livro()
      }
    },

    computed: {

      nocover() {
        return this.$store.state.livros.nocover;
      },

      tituloFormatado() {
        return this.livro.titulo.length > 18 ?
          this.livro.titulo.slice(0,14) + '...' :
          this.livro.titulo;
      }
    },

    methods: {
      imgError(livro) {
        livro.capa = this.nocover;
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import './Card'
</style>
