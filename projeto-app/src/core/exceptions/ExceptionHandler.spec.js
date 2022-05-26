import ApiErrorValidations from '@/core/exceptions/ApiErrorValidations'
import { Alert, PageUtils } from '@/core/utils'
import { mensagens } from '../constants'
import ExceptionHandler from './ExceptionHandler'

jest.mock('@/core/utils')
jest.mock('@/core/store', () => {})
jest.mock('@/views/routers', () => {})

describe('ExeptionHandler', () => {
	beforeEach(() => {
		Alert.mockClear()
		PageUtils.mockClear()
	})

	it('tratarError', () => {
		const error = {
			message: 'Error qualquer',
		}
		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('Error qualquer')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('tratarError - badRequest', () => {
		const message = 'bad request'
		const response = { data: { message: null }, status: 400 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('bad request')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('tratarError - forbidden', () => {
		const message = 'forbidden'
		const response = { data: { message: null }, status: 403 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('forbidden')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleMultipleErrors', () => {
		const message = ''
		const response = {
			data: {
				errorMessages: [{ message: 'erro1' }, { message: 'erro2' }],
			},
		}
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('erro1 \n' + 'erro2')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleDisconnected', () => {
		const message = 'disconnected'
		const response = false
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual(mensagens.DISCONNECTED)
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleUnauthorized', () => {
		const message = ''
		const response = { data: 'teste', status: 401 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual(mensagens.LOST_SESSION)
		expect(PageUtils.prototype.reload.mock.calls.length).toEqual(1)
	})

	it('handleNotFound', () => {
		const message = ''
		const response = { data: { message: 'not found' }, status: 404 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('not found')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleInternalError com mensagem', () => {
		const message = ''
		const response = { data: { message: 'mensagem teste' }, status: 500 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual('mensagem teste')
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleInternalError sem mensagem', () => {
		const message = 'teste'
		const response = { data: { message: null }, status: 500 }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual(mensagens.UNKNOWN)
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})

	it('handleUnknown', () => {
		const message = ''
		const response = { data: null }
		const error = new ApiErrorValidations(message, response)

		ExceptionHandler.execute(error)

		expect(Alert.prototype.showError.mock.calls[0][0]).toEqual(mensagens.UNKNOWN)
		expect(Alert.prototype.showError.mock.calls.length).toEqual(1)
	})
})
