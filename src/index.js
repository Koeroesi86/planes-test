import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import './index.scss'
import App from './components/app/App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import history from './configurations/history'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App history={history}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
