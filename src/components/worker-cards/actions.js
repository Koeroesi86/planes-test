export const RECEIVE_WORKERS = 'RECEIVE_WORKERS';
export const LIKE_WORKER = 'LIKE_WORKER';
export const DISLIKE_WORKER = 'DISLIKE_WORKER';

export function receiveWorkers(workers) {
    return {
        type: RECEIVE_WORKERS,
        workers
    }
}

export function likeWorker(index) {
    return {
        type: LIKE_WORKER,
        index
    }
}

export function dislikeWorker(index) {
    return {
        type: DISLIKE_WORKER,
        index
    }
}