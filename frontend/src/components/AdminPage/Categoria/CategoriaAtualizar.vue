<template>
	<section>
		<banner
			titulo='Categorias'
			subtitulo='Atualização'
	      	homeLink="CategoriaHome"
		/>

      <formulario
        class="container"
				:categoria="categoria"
				@salvarCategoria="salvar()"
			/>
	</section>
</template>

<script>
	import banner from '../../fixed/Banner';
	import formulario from './form.vue';
	import Categoria from '../../../models/Categoria.js';
	import CategoriaService from '../../../services/categoria/CategoriaService.js';


	export default {

		data() {
			return {
				categoria: new Categoria(),
				categoriaService: new CategoriaService(),
			}
		},

		methods: {
			salvar() {
				this.categoriaService
					.salvar(this.categoria)
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

		created() {
			const id = this.$route.params.id;
			this.categoriaService
				.pegaCategoria(new Categoria({ id }))
				.then(response => response.data)
				.then(categoria => this.categoria = categoria)

		},

		components: {
			banner,
			formulario,
		}

	}
</script>
