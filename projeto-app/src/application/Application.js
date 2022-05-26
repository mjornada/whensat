import register from '@/application/engine/Register'
import rootPageCreator from '@/application/engine/RootPageCreator'
import triggerEvents from '@/application/engine/TriggerEvent'

export default class Application {
	static run() {
		register.registerAll()

		triggerEvents
			.triggerOnStartEvents()
			.then(() => {
				rootPageCreator.createInstance()
			})
			.catch(() => {
				rootPageCreator.createBootstrapError()
			})
	}
}
