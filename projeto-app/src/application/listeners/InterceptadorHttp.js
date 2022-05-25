import axios from 'axios'
import store from '@/core/store'
import {LoadingScreen} from '@/core/utils'
import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'

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
        throw new ApiErrorValidations(error.response.data.message, error.response)
    }
}

export default new InterceptadorHttp()
