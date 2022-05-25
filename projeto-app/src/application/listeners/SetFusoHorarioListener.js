import moment from 'moment-timezone'
import {fusoHorario} from '@/core/constants'

class SetFusoHorarioListener {
    async execute() {
        return new Promise((resolve) => {
            moment.tz.setDefault(fusoHorario.FUSO_HORARIO_DEFAULT)
            moment.locale('pt')
            resolve()
        })
    }
}

export default new SetFusoHorarioListener()
