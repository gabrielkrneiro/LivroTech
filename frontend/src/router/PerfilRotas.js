import PerfilHome from "../components/AdminPage/Perfil/Perfil";
import PerfilCadastro from '../components/AdminPage/Perfil/PerfilCadastro';
import PerfilAtualizar from '../components/AdminPage/Perfil/PerfilAtualizar';

export default [
  {
    path: '/admin/perfis',
    name: 'PerfilHome',
    component: PerfilHome,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/perfis/cadastro',
    name: 'PerfilCadastro',
    component: PerfilCadastro,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/perfis/atualizar/:id',
    name: 'PerfilAtualizar',
    component: PerfilAtualizar,
    meta: { requiresSession: true }
  }
]
