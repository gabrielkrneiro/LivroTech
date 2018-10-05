import Axios from '../ServiceBase';

export default class PerfilService {
  constructor() {
    this.httpclient = Axios;
    this.tableName = 'perfis';
  }

  listarPerfis() {
    return this.httpclient.get(this.tableName);
  }

  salvar(request) {
    return this.httpclient.put(this.tableName, request);
  }

  remover(perfil) {
    return this.httpclient
      .delete(`${this.tableName}/${perfil.id}`);
  }

  pegarPerfil(perfil_id) {
    return this.httpclient
      .get(`${this.tableName}/${perfil_id}`);
  }

}
