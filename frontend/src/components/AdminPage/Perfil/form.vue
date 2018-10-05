<template>
    <form
      class="div-formulario"
      @submit.prevent="salvar()">

      <b-field
        label="Nome"
        :message="errors.first('nome')"
        :type="errors.first('nome') ? 'is-danger' : ''">

        <b-input
          v-model='perfil.nome'
          v-validate="'required'"
          placeholder='e.g.: Usuario comum'
          name="nome"/>

      </b-field>

      <router-link :to="{ name: 'PerfilHome' }">
        <button class="button is-danger">Cancelar</button>
      </router-link>

      <button
        class="button is-success"
        type="submit">Salvar</button>

    </form>
    </template>

    <script>
      import PerfilService from '../../../services/perfil/PerfilService.js';
      import Perfil from '../../../models/Perfil.js';

      export default {
        props: {
          perfil: {
            required: true,
            type: Object,
            default: () => new Perfil()
          }
        },

        data() {
          return {
            perfilService: new PerfilService()
          }
        },

        computed: {
          formularioValido() {
            return this.perfil.nome != '';
          }
        },

        methods: {
          ativarToast(message) {
            this.$toast.open({
              message: message,
              duration: 2000,
              position: 'is-top',
              type: 'is-danger'
            });
          },

          salvar() {
            this.$validator
              .validateAll()
              .then(
                isValid => {
                  if (isValid) {
                    this.$dialog.confirm({
                      message: this.perfil.id ? 'Confirma alterações nesse perfil?' : 'Confirma cadastro desse perfil?',
                      onConfirm: () => this.$emit('botaoAtivado')
                    });
                  } else {
                    this.$toast.open({
                      message: 'dados inválidos',
                      type: 'is-danger'
                    });
                  }
                }
              )
          }
        }
      }
    </script>
