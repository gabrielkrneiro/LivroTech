export default class Categoria {
	constructor(params = '') {
		this.id = params.id || '';
		this.nome = params.nome || '';
	}
}