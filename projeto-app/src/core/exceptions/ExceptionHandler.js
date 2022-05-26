import { mensagens } from '@/core/constants'
import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import store from '@/core/store'
import { Alert, PageUtils } from '@/core/utils'
import router from '@/views/routers'

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
		} else if (error.badRequest()) {
			this.tratarError(error)
		} else if (error.forbidden()) {
			this.tratarError(error)
		} else {
			this.handleUnknown()
		}
	}

	tratarError(error) {
		alert.showError(error.message)
	}

	handleMultipleErrors(errors) {
		const errorMsg = errors
			.map((err) => err.message)
			.reduce((total, prox) => {
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
	}

	handleInternalError(error) {
		if (error.response.data.message) {
			const msgFormatted = error.response.data.message
			alert.showError(msgFormatted.toString())
		} else {
			this.handleUnknown()
		}
	}

	handleUnknown() {
		alert.showError(mensagens.UNKNOWN)
	}
}

export default new ExceptionHandler()
