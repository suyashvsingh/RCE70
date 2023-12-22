import random from 'random'

const createId = () => {
    return random.int(0, 1000000).toString(36)
}

export default createId
