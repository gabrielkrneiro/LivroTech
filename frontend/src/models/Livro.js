export default class Livro {
  constructor(params = '') {
    this.id = params.id || '';
    this.titulo = params.titulo || '';
    this.autor_id = params.autor_id || '';
    this.capa = params.capa || '';
    this.descricao = params.descricao || '';
  }
}
