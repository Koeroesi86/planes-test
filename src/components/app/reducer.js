import {routes} from '../../configurations/routes'
import {APP_SET_ERROR_MESSAGE} from "./actions";

export const initialState = {
    error: null,
    routes
};

export default (state = initialState, action) => {
    if (action.type === APP_SET_ERROR_MESSAGE) {
        return Object.assign({}, state, {error: action.message});
    }

    return state;
}