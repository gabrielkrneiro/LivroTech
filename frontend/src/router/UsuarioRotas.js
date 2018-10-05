import UsuarioHome from "../components/AdminPage/Usuario/Usuario";
import UsuarioCadastro from '../components/AdminPage/Usuario/UsuarioCadastro';
import UsuarioAtualizar from '../components/AdminPage/Usuario/UsuarioAtualizar';

export default [
  {
    path: '/admin/usuarios',
    name: 'UsuarioHome',
    component: UsuarioHome,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/usuarios/cadastro',
    name: 'UsuarioCadastro',
    component: UsuarioCadastro,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/usuarios/atualizar/:id',
    name: 'UsuarioAtualizar',
    component: UsuarioAtualizar,
    meta: { requiresSession: true }
  }
]
