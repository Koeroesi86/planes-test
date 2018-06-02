import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducers'
import middlewares from './configurations/middlewares'
import initialState from './configurations/initial-state'
import {initApp} from './components/app/actions'

const enhancers = [];

if (process.env && process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers
);

store.dispatch(initApp());

export default store