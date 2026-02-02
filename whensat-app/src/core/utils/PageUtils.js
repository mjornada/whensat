import { routesNames } from '@/core/constants'

export default class PageUtils {
	constructor(router) {
		this.router = router
	}

	goToHome() {
		this.router.push({ name: routesNames.INICIO })
	}

	reload() {
		setTimeout(() => window.location.reload(), 3000)
	}
}
