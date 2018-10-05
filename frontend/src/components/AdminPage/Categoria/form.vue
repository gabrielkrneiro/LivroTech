<template>
    <form
      class="div-formulario"
      @submit.prevent="salvar()">

		<b-field>

			<b-input
				v-model="categoria.id"
        type="hidden"/>

		</b-field>

    <b-field
      label="Nome da Categoria"
      :type="errors.first('nome') ? 'is-danger' : ''"
      :message="errors.first('nome')">

			<b-input
        v-model="categoria.nome"
        v-validate="'required'"
        placeholder="ex.: Artes"
        name="nome"/>

		</b-field>

 		<div class="field is-grouped">

 			<div class="control">
 				<router-link :to="{ name: 'CategoriaHome' }">
 					<button class="button is-danger"> Cancelar</button>
 				</router-link>
 			</div>

 			 <div class="control">
 			 	<button
 			 		class="button is-success">Salvar</button>
 			 </div>

 		</div>

		</form>
</template>

<script>
	import Categoria from '../../../models/Categoria.js';

	export default {
		props: {
			categoria: {
				required: false,
				type: Object,
				default: () => new Categoria()
			}
    },

    computed: {
      formularioValido() {
        return this.categoria.nome != '';
      }
    },

		methods: {
      ativarToast(message) {
        this.$toast.open({
            message: message,
            type: 'is-danger',
            position: 'is-top',
            duration: 2000
          });
      },

			salvar() {
        this.$validator
          .validateAll()
          .then(isValid => {
            if (isValid) {
              this.$dialog.confirm({
                message: this.categoria.id ? 'Confirma alterações nessa categoria?' : 'Confirma o cadastro dessa categoria?',
                onConfirm: () => this.$emit('salvarCategoria')
              });
            } else {
              this.$toast.open({
                message: 'dados inválidos',
                type: 'is-danger'
              });
            }
          });
			}
		}
	}
</script>
