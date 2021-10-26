import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { getReposReducer } from './reducers/repoReducer'

const allReducers = combineReducers({
    repos: getReposReducer
})

const bindMiddlware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware( ... middleware))
    }
    
    return applyMiddleware( ... middleware)
}

const hudrateReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        return nextState
    } else {
        return allReducers(state, action)
    }
}

const initState = () => {
    return createStore(hudrateReducer, bindMiddlware([thunkMiddleware]))
}

export const wrapper = createWrapper(initState)
