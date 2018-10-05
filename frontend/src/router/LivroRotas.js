import LivroHome from "../components/AdminPage/Livro/Livro";
import LivroCadastro from '../components/AdminPage/Livro/LivroCadastro.vue';
import LivroAtualizar from '../components/AdminPage/Livro/LivroAtualizar';

export default [
  {
    path: '/admin/livros',
    name: 'LivroHome',
    component: LivroHome,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/livros/cadastro',
    name: 'LivroCadastro',
    component: LivroCadastro,
    meta: { requiresSession: true }
  },
  {
    path: '/admin/livros/atualizar/:id',
    name: 'LivroAtualizar',
    component: LivroAtualizar,
    meta: { requiresSession: true }

  }
]
