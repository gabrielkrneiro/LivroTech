<template>
  <div>
    <banner
      titulo='Livros'
      subtitulo='Cadastro'
      homeLink='LivroHome'
    />

    <formulario
      class="container"
      @botaoAtivado="salvar()"
      :livro="livro"
    >
    </formulario>
  </div>
</template>

<script>
  import banner from '../../fixed/Banner';
  import formulario from './form';

  import Livro from '../../../models/Livro.js';
  import LivroService from '../../../services/livro/LivroService.js';


	export default {
		components: {
      banner,
      formulario
    },

    data() {
      return {
        livro: new Livro(),
        livroService: new LivroService(),
        livro: new Livro()
      }
    },

    methods: {
      salvar() {
        this.livroService
          .salvar(this.livro)
          .then(response => response.data)
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
