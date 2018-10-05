import AdminAutorPage from '../components/AdminPage/Autor/Autor.vue';
import AutorCadastro from '../components/AdminPage/Autor/AutorCadastro.vue';
import AutorAtualizar from '../components/AdminPage/Autor/AutorAtualizar.vue';

const rotasAutor = [
    {
      path: '/admin/autores',
      name: 'AutorHome',
      component: AdminAutorPage,
      meta: { requiresSession: true }
    },
    {
      path: '/admin/autores/salvar',
      name: 'AutorCadastro',
      component: AutorCadastro,
      meta: { requiresSession: true }
    },
    {
      path: '/admin/autores/atualiza/:id',
      name: 'AutorAtualizar',
      component: AutorAtualizar,
      meta: { requiresSession: true }
    },
]

export default rotasAutor;
