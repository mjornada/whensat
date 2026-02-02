import httpStatus from './HttpStatus'

describe('HttpStatus', () => {
	it('Deve retornar true para disconnected', () => {
		const response = undefined
		const requisicao = new httpStatus(response)
		expect(requisicao.disconnected()).toBe(true)
	})

	it('Deve retornar true para unauthorized', () => {
		const response = {
			status: 401,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.unauthorized()).toBe(true)
	})

	it('Deve retornar true para internalError', () => {
		const response = {
			status: 500,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.internalError()).toBe(true)
	})

	it('Deve retornar true para notFound', () => {
		const response = {
			status: 404,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.notFound()).toBe(true)
	})

	it('Deve retornar true para badRequest', () => {
		const response = {
			status: 400,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.badRequest()).toBe(true)
	})

	it('Deve retornar true para forbidden', () => {
		const response = {
			status: 403,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.forbidden()).toBe(true)
	})

	it('Deve retornar false para todas as checagens de status', () => {
		const response = {
			status: 302,
		}
		const requisicao = new httpStatus(response)
		expect(requisicao.disconnected()).toBe(false)
		expect(requisicao.internalError()).toBe(false)
		expect(requisicao.unauthorized()).toBe(false)
		expect(requisicao.notFound()).toBe(false)
		expect(requisicao.forbidden()).toBe(false)
	})
})
