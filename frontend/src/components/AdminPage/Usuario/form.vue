<template>
  <form @submit.prevent="salvar()">
      <b-field
      label="Nome"
      :message="errors.first('nome') || ''"
      :type="errors.first('nome') ? 'is-danger' : ''" >

        <b-input
          v-model='usuario.nome'
          placeholder='e.g.: Maria Batista'
          v-validate="'required|min:3'"
          name="nome"/>
    </b-field>

    <b-field
      label='E-mail'
      :message="errors.first('email')"
      :type="errors.first('email') ? 'is-danger' : ''">

      <b-input
        v-model="usuario.email"
        placeholder='e.g.: maria@batista.com'
        name="email"
        v-validate="'required|email'"
        data-vv-as="E-mail"
        id="email"/>

    </b-field>

    <b-field
      label='Senha'
      :message="errors.first('senha')"
      :type="errors.first('senha') ? 'is-danger' : ''">

      <b-input
        v-model="usuario.senha"
        placeholder='e.g.: mariabatista123'
        type="password"
        name="senha"
        v-validate="'required|min:6'"/>

    </b-field>


    <b-field
      label='Perfil'
      :message="errors.first('perfil')"
      :type="errors.first('perfil') ? 'is-danger' : ''">

      <b-select
        v-model="usuario.perfil_id"
        placeholder="Selecione um perfil"
        v-validate="'required'"
        name="perfil">

        <option
          v-for="perfil of perfis"
          :value="perfil.id"
          :key="perfil.id">{{ perfil.nome }}</option>

      </b-select>

    </b-field>

    <router-link :to="{ name: 'UsuarioHome' }">
      <button class="button is-danger">Cancelar</button>
    </router-link>

    <button
      class="button is-success"
      type="submit"
    >Salvar</button>

  </form>
  </template>

  <script>
    import PerfilService from '../../../services/perfil/PerfilService.js';
    import Usuario from '../../../models/Usuario.js';
    export default {
      props: {
        usuario: {
          required: true,
          type: Object,
          default: () => new Usuario()
        }
      },

      data() {
        return {
          perfis: [],
          perfilService: new PerfilService()
        }
      },

      created() {
        this.perfilService
          .listarPerfis()
          .then(response => response.data)
          .then(perfis => this.perfis = perfis)
          .catch(error => console.log(error.message));
      },

      methods: {

        salvar() {
          this.$validator
            .validateAll()
            .then( isValid => {
              if (isValid) {
                this.$dialog.confirm({
                  message: this.usuario.id ? 'Confirma alterações nesse usuario?' : 'Confirma cadastro desse usuario?',
                  onConfirm: () => this.$emit('botaoAtivado', {usuario: new Usuario(this.usuario)})
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
