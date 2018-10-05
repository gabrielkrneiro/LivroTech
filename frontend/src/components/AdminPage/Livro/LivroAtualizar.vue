<template>
  <div>
    <banner
      titulo="Livros"
      subtitulo="Atualização"
      homeLink="LivroHome"
    />

    <section>
      <!-- descomentar o v-if para ver problema com a
      assincronicidade (nao carrega categorias)-->
      <formulario
        v-if="livro.id"
        class="container"
        :livro="livro"
        @botaoAtivado="salvar()"
      />
    </section>
  </div>
</template>

<script>
  import banner from '../../fixed/Banner';
  import formulario from './form';
  import Livro from '../../../models/Livro.js';
  import LivroService from '../../../services/livro/LivroService.js'

  export default {
    components: {
      banner,
      formulario
    },

    data() {
      return {
        livro: {},
        livroService: new LivroService()
      }
    },

    created() {
      const id = this.$route.params.id;
      this.livroService
        .pegarLivro(id)
        .then(response => response.data)
        .then(livro => this.livro = livro)
        .catch(error => console.log(error.message));
    },

    methods: {
      salvar() {
        this.livroService
          .salvar(this.livro)
          .then(response => this.$router.push({ name: 'LivroHome' }))
          .then(livro => {
            this.$toast.open({
              message: 'Livro Salvo com sucesso.',
              type: 'is-success'
            });
            this.$router.push({ name: 'LivroHome' });
          })
          .catch(error => {
            console.log(error.message)
            this.$toast.open({
              message: 'Não foi possível salvar o livro.',
              type: 'is-danger'
            });
          });
      }
    }
  }
</script>
