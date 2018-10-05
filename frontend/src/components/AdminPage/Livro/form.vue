<template>
  <form
    class="div-formulario"
    @submit.prevent="salvar()">

    <b-field
      label="Titulo"
      :message="errors.first('titulo')"
      :type="errors.first('titulo') ? 'is-danger' : ''">

      <b-input
        v-model='livro.titulo'
        v-validate="'required'"
        placeholder='e.g.: E o Vento Levou'
        name="titulo"/>

    </b-field>

    <b-field
      label='Capa'>

      <b-input
        v-model="livro.capa"
        placeholder='e.g.: http://capaDoLivro.com/image.jpg'
        name="capa"/>

    </b-field>

    <b-field
      label='Descricao'
      :message="errors.first('descricao')"
      :type="errors.first('descricao') ? 'is-danger' : ''">

      <b-input
        v-model="livro.descricao"
        v-validate="'required|min:6'"
        placeholder='e.g.: Um bom lugar para ler um livro'
        type='textarea'
        name="descricao"/>

    </b-field>


    <b-field
      label='Autor'
      :message="errors.first('autor')"
      :type="errors.first('autor') ? 'is-danger' : ''">

      <b-select
        v-model="livro.autor_id"
        v-validate="'required'"
        placeholder='Selecione um autor'
        name="autor"
      >
        <option
          v-for="autor of autores"
          :value="autor.id"
          :key="autor.id"
        >{{ autor.nome }}</option>
      </b-select>

    </b-field>

    <b-field
      label='Categorias'
      :message="errors.first('categoriasSelecionadas')"
      :type="errors.first('categoriasSelecionadas') ? 'is-danger' : ''">

    <div class="block">
      <b-checkbox
        v-model="categoriasSelecionadas"
        v-validate="'required'"
        v-for="categoria of categorias"
        data-vv-as="categoria"
        :key="categoria.id"
        :native-value="categoria.id"
        name="categoriasSelecionadas">{{ categoria.nome }}</b-checkbox>
    </div>

    </b-field>

    <router-link :to="{ name: 'LivroHome' }">
      <button class="button is-danger">Cancelar</button>
    </router-link>

    <button
      class="button is-success"
      type="submit"
    >Salvar</button>

  </form>
</template>

<script>
  import nocoverImg from '../../../../static/no-cover.jpg';

  import Livro from '../../../models/Livro.js';
  import Autor from '../../../models/Autor.js';
  import Categoria from '../../../models/Autor.js';

  import AutorService from '../../../services/autor/AutorService';
  import CategoriaService from '../../../services/categoria/CategoriaService.js';
  import LivroService from '../../../services/livro/LivroService.js';


  export default {
    props: {
      livro: {
        required: false,
        type: Object,
        default: () => new Livro()
      }
    },

    data() {
      return {
        autores: [],
        categorias: [],
        categoriasSelecionadas: [],
        autorService: new AutorService(),
        categoriaService: new CategoriaService(),
        nocoverImg
      }
    },

    methods: {

      salvar() {
        this.$validator
          .validateAll()
          .then( isValid => {
            if (isValid) {
              this.$dialog.confirm({
                message: this.livro.id ? 'Confirma alterações nesse livro' : 'Confirma o cadastro desse livro?',
                onConfirm: () => {
                  // if (!this.livro.capa) {
                  //   this.livro.capa = this.nocoverImg
                  // }
                  this.livro.categoria = this.categoriasSelecionadas;
                  this.$emit('botaoAtivado');
                }
              });
            } else {
              this.$toast.open({
                message: 'dados inválidos',
                type: 'is-danger'
              })
            }
          });
      }
    },

    created() {
      // se for a atualizacao de um livro, eh necessario
      // carregar as categorias nas quais está registrado
      if (this.livro.categoria) {
        this.livro.categoria.forEach(
          el => this.categoriasSelecionadas.push(el.id)
        );
      }

      this.autorService
        .pegaTodosOsAutores()
        .then(response => response.data)
        .then(autores => this.autores = autores)
        .catch(error => error.message);

      this.categoriaService
        .listaDeCategorias()
        .then(response => response.data)
        .then(categorias => this.categorias = categorias)
        .catch(error => error.message);
    }
  }
</script>
