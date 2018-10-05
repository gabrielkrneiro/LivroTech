<template>
  <aside class="menu">
    <ul class="menu-list">

      <li class="menu-item">
        <router-link
          :to="{ name: 'LivroHome' }"
        >
        <b-icon pack="fas" icon="book"/>Livros
      </router-link>
      </li>

      <li class="menu-item">
        <router-link :to="{ name: 'CategoriaHome' }">
          <b-icon pack="fas" icon="book-open"/>Categorias
        </router-link>
      </li>

      <li class="menu-item">
        <router-link :to="{ name: 'AutorHome' }">
          <b-icon pack="fas" icon="address-book"/>Autores
        </router-link>
      </li>

      <li class="menu-item">
        <router-link :to="{ name: 'UsuarioHome' }">
          <b-icon pack="fas" icon="users"/>Usuarios
        </router-link>
      </li>

      <li class="menu-item">
        <router-link :to="{ name: 'PerfilHome' }">
            <b-icon pack="fas" icon="user-circle"/>Perfis
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @import './MenuAside';
</style>
