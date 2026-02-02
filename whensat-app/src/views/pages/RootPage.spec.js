import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { shallowMount } from '@vue/test-utils'
import RootPage from './RootPage'

describe('RootPage.vue', () => {
	let wrapper, localVue

	beforeEach(() => {
		localVue = applicationTestBuilder.build()
	})

	it('RootPage é uma instância do vue', () => {
		wrapper = shallowMount(RootPage, {
			localVue,
		})
		expect(wrapper).toBeTruthy()
	})
})
