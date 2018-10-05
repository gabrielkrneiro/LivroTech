import Axios from '../ServiceBase';
import Usuario from '../../models/Usuario.js';

export default class UsuarioService {
  constructor(params = '') {
    this.httpclient = Axios;
    this.tableName = 'usuarios';
    this.usuario = params.usuario || new Usuario();
  }

  listarUsuarios() {
    return this.httpclient
      .get(`${this.tableName}?filter={"include":["perfil"]}`);
  }

  salvar(request) {
    return this.httpclient
      .put(this.tableName, request);
  }

  remover(usuario) {
    return this.httpclient
      .delete(`${this.tableName}/${usuario.id}`);
  }

  pegarUsuario(usuario_id) {
    return this.httpclient
      .get(`${this.tableName}/${usuario_id}?filter={"include":["perfil"]}`);
  }

  usuarioExiste() {
    return this.httpclient.get(`${this.tableName}/findOne?filter={
      "where":{"email":"${this.usuario.email}"},
      "include":["perfil"]
    }`);
      // .get(`
      //   ${this.tableName}/findOne?filter=
      //   {
      //     "where":{"email":"${this.usuario.email}"},
      //     "include":["perfil"]
      //   }`);
  }

  senhaEstaCorreta(response) {
    return new Promise((resolve, reject) => {
      this.usuario.senha == response.senha ? resolve(true) : reject(false);
    });
  }

  logarNoService() {
    return this.httpclient
    .post(`${ this.tableName }/update?where={"email":"${ this.usuario.email }"}`, { logado: true });
  }

  efetuarLogout() {
    // console.log(this.usuario);
    return this.httpclient
      .post(`${ this.tableName }/update?where={"email":"${ this.usuario.email }"}`, { logado: false });
  }

  efetuarLogin() {

    return new Promise((resolve, reject) => {
      // verifica se o usuario existe no banco
      this
        .usuarioExiste()
        .then(response => response.data)
        .then(usuarioResponse => {
          //verifica se a senha esta correta
          this
            .senhaEstaCorreta(usuarioResponse)
            .then(() => {
              // trocar o atributo logado do usuario no banco
              this
                .logarNoService()
                .then(() => resolve(usuarioResponse))
                .catch(error => reject(error));
            })
            .catch(() => reject(new Error(`Senha não está correta`))
            );
        })
        .catch(() => reject(new Error('E-mail inválido')));
    });
  }

}
