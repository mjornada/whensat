import router from '@/views/routers'
import store from '@/core/store'
import {Alert, PageUtils} from '@/core/utils'
import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import {mensagens} from '@/core/constants'

const alert = new Alert(store)
const pageUtils = new PageUtils(router)

class ExceptionHandler {
    execute(error) {
        if (error instanceof ApiErrorValidations) {
            this.tratarValidationError(error)
        } else {
            this.tratarError(error)
        }
    }

    tratarValidationError(error) {
        if (error.multipleErrors()) {
            this.handleMultipleErrors(error.response.data.errorMessages)
        } else if (error.disconnected()) {
            this.handleDisconnected()
        } else if (error.unauthorized()) {
            this.handleUnauthorized()
        } else if (error.internalError()) {
            this.handleInternalError(error)
        } else if (error.notFound()) {
            this.handleNotFound(error)
        } else {
            this.handleUnknown()
        }
    }

    tratarError(error) {
        alert.showError(error.message)
    }

    handleMultipleErrors(errors) {
        const errorMsg = errors.map(err => err.message).reduce((total, prox) => {
            return total + ' \n' + prox
        })
        alert.showError(errorMsg)
    }

    handleDisconnected() {
        alert.showError(mensagens.DISCONNECTED)
        pageUtils.goToHome()
    }

    handleUnauthorized() {
        alert.showError(mensagens.LOST_SESSION)
        pageUtils.reload()
    }

    handleNotFound(error) {
        this.handleInternalError(error)
        pageUtils.goToHome()
    }

    handleInternalError(error) {
        // TODO arrumar para tratar a mensagem
        const msgFormatted = error.response.data.message
        if (msgFormatted) {
            alert.showError(msgFormatted)
        } else {
            this.handleUnknown()
        }
    }

    handleUnknown() {
        alert.showError(mensagens.UNKNOWN)
    }
}

export default new ExceptionHandler()