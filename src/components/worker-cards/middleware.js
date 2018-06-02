import {receiveWorkers} from './actions'
import {WORKERS} from '../../configurations/constants'
import {INIT_APP} from '../app/actions'

export default store => next => action => {
    if (action.type === INIT_APP) {
        store.dispatch(receiveWorkers(WORKERS))
    }

    next(action);
}