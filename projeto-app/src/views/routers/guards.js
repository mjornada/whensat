import conditions from './conditions'

class RouterGuards {

    async conditions(to, from, next) {
        const tasks = Object.keys(conditions)
        let nextExecuted = false

        nextExecuted = await tasks.some((condition) => {
            if(conditions[condition].runningCondition(to, from)) {
                next()
                return true
            }
            return false
        })

        if(!nextExecuted) {
            nextExecuted = await tasks.some((condition) => {
                if(conditions[condition].shouldExecute(to, from)) {
                    conditions[condition].execute(to, from, next)
                    return true
                }
                return false
            })
        }

        if(!nextExecuted) {
            next()
        }
    }
}

export default new RouterGuards()

