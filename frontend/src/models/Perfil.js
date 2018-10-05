export default class Usuario {
  constructor(params = '') {
    this.id = params.id || '';
    this.nome = params.nome || '';
  }
}
