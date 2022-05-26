import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import exceptionHandler from '@/core/exceptions/ExceptionHandler'
import store from '@/core/store'
import { LoadingScreen } from '@/core/utils'
import axios from 'axios'

const loading = new LoadingScreen(store)

class InterceptadorHttp {
	async execute() {
		return new Promise((resolve) => {
			this.registrarInterceptadores()
			this.setarVariaveisFixasNoHeaderDaRequest()
			resolve()
		})
	}

	registrarInterceptadores() {
		axios.interceptors.request.use(this.tratarRequest, this.tratarErros)
		axios.interceptors.response.use(this.tratarResponse, this.tratarErros)
	}

	setarVariaveisFixasNoHeaderDaRequest() {
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
	}

	tratarRequest(config) {
		loading.start()
		return config
	}

	tratarResponse(response) {
		loading.stop()
		return response
	}

	tratarErros(error) {
		loading.stop()
		const erro = new ApiErrorValidations(error.response.data.message, error.response)
		exceptionHandler.execute(erro)
		throw erro
	}
}

export default new InterceptadorHttp()
