import Categoria from "../components/AdminPage/Categoria/Categoria";
import CategoriaCadastro from '../components/AdminPage/Categoria/CategoriaCadastro';
import CategoriaAtualizar from '../components/AdminPage/Categoria/CategoriaAtualizar';

export default [
  {
    path: '/admin/categorias',
    name: 'CategoriaHome',
    component: Categoria,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/categorias/cadastro',
    name: 'CategoriaCadastro',
    component: CategoriaCadastro,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/categorias/atualizar/:id',
    name: 'CategoriaAtualizar',
    component: CategoriaAtualizar,
    meta: { requiresSession: true }

  }
]
