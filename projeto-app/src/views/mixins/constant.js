import {formatosDefault, mensagens} from '@/core/constants'

export default {
    data() {
        return {
            formatosDefault,
            mensagens,
        }
    },
    methods: {
        formatarLista(constant) {
            const list= Object.getOwnPropertyNames(constant).sort()
            if(list.indexOf('__ob__') >= 0) {
                list.splice(list.indexOf('__ob__'), 1)
            }
            return list
        }
    }
}