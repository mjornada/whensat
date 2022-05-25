import Router from 'vue-router'
import guards from './guards'
import interno from './routes/interno'
import comum from './routes/comum'

const index = new Router({
    routes: [
        {
            path: '/',
            name: 'Inicial',
            redirect: () => {
                return {name: 'TodosProjetos'}
            }
        },
        ...comum,
        ...interno
    ]
})

index.beforeEach((to, from, next) => guards.conditions(to, from, next))

export default index
