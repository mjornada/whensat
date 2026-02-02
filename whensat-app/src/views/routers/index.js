import VueRouter from 'vue-router'
import guards from '@/views/routers/guards'
import comum from '@/views/routers/routes/comum'
import projeto from '@/views/routers/routes/projeto'

const router = new VueRouter({
	routes: [...comum, ...projeto],
})

router.beforeEach((to, from, next) => guards.condicoes(to, from, next))

export default router
