import UsuarioService from '../services/usuario/UsuarioService.js';

export default class Usuario {
    constructor(params = '') {
      this.id = params.id || '';
      this.email = params.email || '';
      this.nome = params.nome || '';
      this.senha = params.senha || '';
      this.perfil_id = params.perfil_id || '';
      this.logado = params.logado ? true : false;
    }

    usuarioService() {
      return new UsuarioService({ usuario: this });
    }

    logar() {
      return this.usuarioService().efetuarLogin();
    }

    deslogar() {
      return this.usuarioService().efetuarLogout();
    }

    buscaUsuarioPorEmail() {
      return this.usuarioService().usuarioExiste();
    }

    estaLogado() {
      return this.buscaUsuarioPorEmail()
        .then(response => response.data)
        .then(
          usuarioResponse => usuarioResponse,
          error => error
        )
    }



}
