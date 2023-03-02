import CustomerService from '../../service/RepositoriesService'
import {
    CLEAR_ERROR,
    REOPS_LOAD_FAIL,
    REOPS_LOAD_SUCCESS
} from '../constants/repoConstants'

// Get all Repos
export const getRepos = (query) => async (dispatch) => {
    try {
        const data = await CustomerService.getAllRepos(query)

        dispatch({
            type: REOPS_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REOPS_LOAD_FAIL,
            payload: error.responce.data.messssage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
    })
}