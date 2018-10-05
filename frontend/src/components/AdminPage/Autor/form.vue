<template>
  <div>
    <form
      action=""
      @submit.prevent="salvar()"
    >
      <b-field>
        <b-input
          v-model="autor.id"
          type="hidden"
        />
      </b-field>

      <b-field
        label="Nome do Autor"
        :message="errors.first('nome')"
        :type="errors.first('nome') ? 'is-danger' : ''">

        <b-input
          v-model="autor.nome"
          v-validate="'required'"
          placeholder="ex.: Sthephen Hawking"
          name="nome"/>

      </b-field>

      <div
        class="field is-grouped">

        <div
          class="control">

          <router-link :to="{ name: 'AutorHome' }">
            <a class="button is-danger">Cancelar</a>
          </router-link>

        </div>

        <div
          class="control">

          <button
            class="button is-success"
            type="submit">Salvar</button>

        </div>

      </div>

    </form>
  </div>
</template>

<script>
import Autor from '../../../models/Autor.js';

export default {

  props: {
    autor : {
      required: false,
      type: Object,
      default: () => new Autor() // type Object/Array have to use factory
    }
  },

  data() {
    return {
      message: '',
      tituloDoFormulario: 'Criando um autor'
    }
  },

  computed: {
    formularioValido() {
      return  this.autor.nome != '';
    }
  },

  created() {
    // this.autor = new Autor({id: 1, nome: 'gabriel'});

    if (this.autor.id) {
      this.tituloDoFormulario = 'Atualizando autor';
    }
  },

  methods: {

    salvar() {
      this.$validator
        .validateAll()
        .then(
          isValid => {
            if (isValid) {
              this.$dialog.confirm({
                message: this.autor.id ? 'Confirma alterações nesse autor?' : 'Confirma o cadastro desse autor?',
                onConfirm: () => this.$emit('botaoAtivado')
              });
            } else {
              this.$toast.open({
                message: 'dados inválidos',
                type: 'is-danger'
              })
            }
          }
        )
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
