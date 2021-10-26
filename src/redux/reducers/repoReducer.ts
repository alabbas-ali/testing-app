import {
    CLEAR_ERROR,
    REOPS_LOAD_FAIL,
    REOPS_LOAD_SUCCESS
} from '../constants/repoConstants'

// get repos reducer
export const getReposReducer = (state = { repos : { }}, action) => {
    switch (action.type) {
        case REOPS_LOAD_SUCCESS:
            return {
                repos: action.repos
            }
        case REOPS_LOAD_FAIL: 
            return {
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                error: null
            }
        default:
            return state
    }
}