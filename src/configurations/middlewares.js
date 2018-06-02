import {routerMiddleware} from 'react-router-redux'
import history from './history'
import app from '../components/app/middleware'
import cards from '../components/worker-cards/middleware'

const router = routerMiddleware(history);

export default [
    app,
    router,
    cards
]