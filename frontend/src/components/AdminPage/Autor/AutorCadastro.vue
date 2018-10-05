<template>
  <div>
    <banner
      titulo='Autor'
      subtitulo="Criando autor"
      homeLink="AutorHome"
    />

      <formulario
        class="container div-formulario"
        :autor="autor"
        @botaoAtivado="salvar()"
      />

  </div>
</template>

<script>
import formulario from "./form";
import banner from '../../fixed/Banner';
import Autor from '../../../models/Autor.js'
import AutorService from '../../../services/autor/AutorService.js';


export default {
  components : {
    formulario,
    banner
  },

  data() {
    return {
      autor: new Autor(),
      autorService: new AutorService(),
    }
  },

  methods: {
    salvar() {
      this.autorService
        .salvarAutor(this.autor)
        .then(response => response.data)
        .then(autor => {
          this.$toast.open({
            message: 'Autor salvo com sucesso.',
            type: 'is-success'
          })
          this.$router.push({ name: 'AutorHome' })
        })
        .catch(error => {
          this.$toast.open({
            message: 'Não foi possível salvar o autor',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
