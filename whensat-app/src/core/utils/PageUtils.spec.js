import router from '@/views/routers'
import { PageUtils } from './index'

jest.useFakeTimers()
jest.mock('@/views/routers', () => ({
	beforeEach: jest.fn(),
	history: {
		current: {
			path: '/',
		},
	},
	push: jest.fn(),
}))

describe('PageUtils', () => {
	let pageUtils

	beforeEach(() => {
		pageUtils = new PageUtils(router)
	})

	it('constructor', () => {
		expect(pageUtils.router).toBeDefined()
	})

	it('goToHome', () => {
		pageUtils.goToHome()

		expect(pageUtils.router.history.current.path).toEqual('/')
	})

	it('reload', () => {
		delete window.location
		window.location = {
			reload: jest.fn(),
		}
		pageUtils.reload()
		jest.runAllTimers()

		expect(window.location.reload).toHaveBeenCalled()
	})
})
