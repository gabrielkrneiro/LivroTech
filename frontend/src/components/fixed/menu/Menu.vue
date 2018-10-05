<template>
  <b-dropdown
    position="is-bottom-left"
  >
    <a
      class="navbar-item"
      slot="trigger"
    >
      <span>Menu</span>
      <b-icon
        pack="fas"
        icon="caret-down-alt"></b-icon>
    </a>

    <!-- sempre vai existir -->
    <b-dropdown-item custom>
        Logado como <b>{{ usuario.nome }}</b>
    </b-dropdown-item>
  <!-- sempre vai existir -->

    <!-- <b-dropdown-item has-link>
      <router-link
        :to="{ name: 'AdminPage' }"
      >
        <b-icon pack="fas" icon="bars"></b-icon>
        <span>Painel de Controle</span>
      </router-link>
    </b-dropdown-item> -->

    <b-dropdown-item
      v-show="opcoes"
      v-for="(opcao, index) of opcoes"
      :key="index"
      has-link
    >
      <router-link
        :to="{ name: opcao.rota }"
      >
        <b-icon pack="fas" :icon="opcao.icone"></b-icon>
        <span>{{ opcao.label }}</span>
      </router-link>
    </b-dropdown-item>

    <!-- sempre vai existir -->
    <b-dropdown-item @click="logout(usuario)">
        <b-icon pack="fas" icon="sign-out-alt"></b-icon>
        <span>Logout</span>
    </b-dropdown-item>
    <!-- sempre vai existir -->
  </b-dropdown>
</template>

<script>
  import Usuario from '../../../models/Usuario.js'

  export default {
    props: {
      usuario: {
        required: true,
        type: Object,
        default: () => new Usuario()
      },
      opcoes: {
        required: false,
        type: Array,
        default: () => []
      }
    },

    methods: {
      logout(){
        this.$dialog.confirm({
          message: 'Deseja realmente deslogar?',
          onConfirm: () => this.$emit('botaoAtivado')
        })
      }
    }
  }
</script>
