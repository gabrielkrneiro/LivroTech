import Axios from '../ServiceBase';

export default class AutorService {
    constructor() {
        this.httpclient = Axios;
        this.tableName = 'autores';
    }

    pegaTodosOsAutores() {
        return this.httpclient.get(this.tableName);
    }

    salvarAutor(autor) {
        return this.httpclient.put(this.tableName, autor);
    }

    removerAutor(autor) {
        return this.httpclient.delete(`${this.tableName}/${autor.id}`);
    }
    
    pegarAutor(id) {
        return this.httpclient.get(`${this.tableName}/${id}`);
    }
}