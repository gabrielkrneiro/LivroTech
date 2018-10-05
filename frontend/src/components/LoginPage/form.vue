<template>
  <form @submit.prevent="logar()">
    <b-field label="E-mail">
      <b-input
        type="email"
        v-model="usuario.email"
        placeholder="E-mail"
        name="email"
        required
      />

    </b-field>

    <b-field label="Senha">
      <b-input
        v-model="usuario.senha"
        placeholder="Senha"
        name="senha"
        type="password"
        required
      />
    </b-field>

    <div class="field is-grouped">
      <div class="control">
        <router-link :to="{ name: 'HomePage' }">
          <button class="button is-danger">Cancelar</button>
        </router-link>
      </div>

      <div class="control">
        <button
          class="button is-success"
          type="submit"
        >Salvar</button>
      </div>
    </div>
  </form>
</template>

<script>
  import Usuario from '../../models/Usuario.js';

  export default {
    props: {
      usuario: {
        required: true,
        type: Object,
        default: () => new Usuario()
      }
    },

    methods: {
      logar() {
        if (this.usuario.email && this.usuario.senha) {
          this.$emit('botaoAtivado');
        }
      }
    }
  }

</script>
