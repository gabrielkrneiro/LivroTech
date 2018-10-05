import Axios from '../ServiceBase';
import Livro from '../../models/Livro.js'

export default class LivroService {
  constructor() {
    this.httpclient = Axios;
    this.tableName = 'livros';
  }

  pegaTodosOsLivros() {
    return this.httpclient
      .get(`${this.tableName}?filter={"include": ["autor","categoria"]}`);
  }

  salvar(request) {
    const livro = new Livro(request);

    // usando promises
    return new Promise((resolve, reject) => {
      this.httpclient
      .put(this.tableName, livro) // salvando o livro no banco de dados
      .then(response => response.data)
      .then(livro_ => {

        // limpando lista de categorias
        this.httpclient
          .delete(`${this.tableName}/${livro_.id}/categoriaLivros`)
          .then(
            () => {},
            error => console.log(error.message)
          );

        // registrando o livro nas categorias selecionadas
        request.categoria.forEach( categoria_id => {
          return this.httpclient
            .put(`${this.tableName}/${livro_.id}/categoria/rel/${categoria_id}`)
            .then(
              () => {},
              error => reject(new Error(error))
            );
        });
        resolve(livro_);
      })
    });

  }

  remover(livro) {
    return this.httpclient
      .delete(`${this.tableName}/${livro.id}/categoriaLivros`)
      .then(() => this.httpclient.delete(`${this.tableName}/${livro.id}`))
      .catch(error => error.message);
  }

  pegarLivro(livro_id) {
    return this.httpclient
      .get(`${this.tableName}/${livro_id}?filter={"include":["autor","categoria"]}`);
  }

}
