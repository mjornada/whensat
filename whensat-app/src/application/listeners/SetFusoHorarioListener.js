import { fusoHorario, mutationTypes } from '@/core/constants'
import store from '@/core/store'
import timezone from 'moment-timezone'

class SetFusoHorarioListener {
	async execute() {
		return new Promise((resolve) => {
			store.commit(mutationTypes.LOKI.SET_TIMEZONE, fusoHorario.FUSO_HORARIO_DEFAULT)
			timezone.tz.setDefault(fusoHorario.FUSO_HORARIO_DEFAULT)
			timezone.locale('pt')
			resolve()
		})
	}
}

export default new SetFusoHorarioListener()
