import TodosProjetos from '@/views/pages/todos-projetos/TodosProjetos'
import Projeto from '@/views/pages/projeto/Projeto'
import DadosGeraisNovo from '@/views/pages/projeto/dados-gerais/DadosGeraisNovo'
import DadosGeraisVisualizacao from '@/views/pages/projeto/dados-gerais/DadosGeraisVisualizacao'
import DadosGeraisEdicao from '@/views/pages/projeto/dados-gerais/DadosGeraisEdicao'
import TarefasVisualizacao from '@/views/pages/projeto/tarefas/TarefasVisualizacao'
import TarefasEdicao from '@/views/pages/projeto/tarefas/TarefasEdicao'

export default [
    {
        path: '/todos',
        name: 'TodosProjetos',
        component: TodosProjetos,
        meta: {
            menu: {
                title: 'Todos',
                icon: 'fas fa-tags'
            },
            page: {
                title: 'Todos os projetos',
                subtitle: 'Lista geral de projetos'
            }
        }
    },
    {
        path: '/projeto/',
        name: 'Projeto',
        component: Projeto,
        children: [
            {
                path: 'dadosGerais/novo',
                name: 'DadosGeraisNovo',
                component: DadosGeraisNovo,
                meta: {
                    page: {
                        title: 'Projeto',
                        subtitle: 'Novo projeto'
                    }
                }
            },
            {
                path: 'dadosGerais/:id/visualizacao',
                name: 'DadosGeraisVisualizacao',
                component: DadosGeraisVisualizacao,
                meta: {
                    page: {
                        title: 'Projeto',
                        subtitle: 'Visualização do projeto'
                    }
                }
            },
            {
                path: 'dadosGerais/:id/edicao',
                name: 'DadosGeraisEdicao',
                component: DadosGeraisEdicao,
                meta: {
                    page: {
                        title: 'Projeto',
                        subtitle: 'Edição do projeto'
                    }
                }
            },
            {
                path: 'tarefas/:id/visualizacao',
                name: 'TarefasVisualizacao',
                component: TarefasVisualizacao,
                meta: {
                    page: {
                        title: 'Projeto',
                        subtitle: 'Visualização do projeto'
                    }
                }
            },
            {
                path: 'tarefas/:id/edicao',
                name: 'TarefasEdicao',
                component: TarefasEdicao,
                meta: {
                    page: {
                        title: 'Projeto',
                        subtitle: 'Edição do projeto'
                    }
                }
            }
        ]
    }
]