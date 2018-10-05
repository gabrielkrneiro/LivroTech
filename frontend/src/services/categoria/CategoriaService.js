import Axios from '../ServiceBase.js';

export default class CategoriaService {
	constructor() {
		this.httpclient = Axios;
		this.tableName = 'categorias';
	}

	listaDeCategorias() {
		return this.httpclient.get(this.tableName);
	}

	salvar(categoria) {
		return this.httpclient.put(this.tableName, categoria);
	}

	remover(categoria) {
		return this.httpclient.delete(`${this.tableName}/${categoria.id}`);
	}

	pegaCategoria(categoria) {
		return this.httpclient.get(`${this.tableName}/${categoria.id}`);
  }

  // salva o livro ja vinculado a essa categoria
  // salvarLivro(params) {
  //   const { livro, categoria_id } = params;
  //   return this.httpclient
  //     .post(`${this.tableName}/${categoria_id}/livro`, livro);
  // }
}
