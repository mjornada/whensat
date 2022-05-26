import { mutationTypes } from '@/core/constants'
import store from '@/core/store'

class SetMenuAvatarListener {
	async execute() {
		return new Promise((resolve) => {
			store.commit(mutationTypes.COMUM.SET_MENU_AVATAR)
			resolve()
		})
	}
}

export default new SetMenuAvatarListener()
