export default class Autor {
    constructor(params = '') {
        this.id = params.id || '';
        this.nome = params.nome || '';
    }
}