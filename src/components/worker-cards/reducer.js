import {DISLIKE_WORKER, LIKE_WORKER, RECEIVE_WORKERS} from './actions'

export const initialState = {
    workers: []
};

export default (state = initialState, action) => {
    if (action.type === RECEIVE_WORKERS) {
        const workers = action.workers.slice().map(worker => {
            return {
                name: worker.name,
                position: worker.position,
                imageUrl: worker.imageUrl
            }
        });

        return Object.assign({}, state, {workers});
    }

    if (action.type === LIKE_WORKER) {
        const {index} = action;
        const workers = state.workers.slice();
        console.log(index);

        workers[index].liked = true;

        return Object.assign({}, state, {workers});
    }

    if (action.type === DISLIKE_WORKER) {
        const {index} = action;
        const workers = state.workers.slice();
        console.log(index);

        workers[index].liked = false;

        return Object.assign({}, state, {workers});
    }

    return state;
}