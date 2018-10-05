<template>
  <div class="card">
    <div class="card-content">
      <p class="title is-5 has-text-centered">
        {{ objeto.nome }}
      </p>
    </div>
    <footer class="card-footer">
        <router-link
          class="card-footer-item"
          :to="{ name: linkDeAtualizacao, params : { id: objeto.id }}"
        >
          <span>Atualizar</span>
        </router-link>

        <a
          @click.prevent="remover(objeto)"
          class="card-footer-item"
        >Remover</a>
    </footer>
  </div>
</template>

<script>
  export default {

    props: {
      objeto: {
        required: true,
        default: Object
      },
      linkDeAtualizacao: {
        required: true,
        default: String
      }
    },

    methods: {
      remover(objeto) {
        this.$dialog.confirm({
          message: 'Deseja realmente excluir o item selecionado?',
          onConfirm: () => this.$emit('botaoAtivado', objeto)
        });
      }
    }
  }
</script>
