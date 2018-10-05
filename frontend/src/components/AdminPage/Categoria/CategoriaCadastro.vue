<template>
	<section>
		<banner
			titulo="Categorias"
			subtitulo="Cadastro"
	      	homeLink="CategoriaHome"
		/>

      <formulario
        class="container"
        @salvarCategoria="salvar()"
        :categoria="categoria"
      />
	</section>
</template>

<script>
	import banner from '../../fixed/Banner.vue';
	import Categoria from '../../../models/Categoria.js';
	import formulario from './form.vue';
	import CategoriaService from '../../../services/categoria/CategoriaService.js';

	export default {

		data() {
			return {
				categoria: new Categoria(),
				categoriaService: new CategoriaService()
			}
		},

		methods: {
			salvar() {
				this.categoriaService
					.salvar(this.categoria)
					.then(response => response.data)
					.then(categoria => {
            this.$toast.open({
              message: 'Categoria Salva com sucesso.',
              type: 'is-success'
            });
            this.$router.push({ name: 'CategoriaHome' });
          })
          .catch(error => {
            console.log(error.message)
            this.$toast.open({
              message: 'Não foi possível salvar a categoria.',
              type: 'is-danger'
            });
          });
			}
		},

		components: {
			banner,
			formulario,
		},
	}
</script>
