export const INIT_APP = 'INIT_APP';
export const APP_REQUEST_ERROR = 'APP_REQUEST_ERROR';
export const APP_SET_ERROR_MESSAGE = 'APP_SET_ERROR_MESSAGE';

export function initApp() {
    return {
        type: INIT_APP
    }
}

export function appRequestError(error) {
    return {
        type: APP_REQUEST_ERROR,
        error
    }
}

export function setErrorMessage(message) {
    return {
        type: APP_SET_ERROR_MESSAGE,
        message
    }
}