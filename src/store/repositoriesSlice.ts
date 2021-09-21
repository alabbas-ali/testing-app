import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { AppThunk, RootState } from '.'
import { Repository } from '../models/repo'
import { RepoPage } from "../models/repo.page"
import RepositoriesService, { QueryParams } from "../service/RepositoriesService"

export interface ReposState {
	result: RepoPage
	page: string 
	proPage: string
	order: string
	sort: string
	search: string
	loading: boolean
	stared: Array<Repository>
	error: any
	showStared: boolean
}

export const initialState: ReposState = {
	result: null,
	page: '1',
	proPage: '10',
	order: 'desc',
	sort: 'stars',
	search: `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}`,
	loading: false,
	stared: [],
	error: null,
	showStared: false
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getRepos = createAsyncThunk('repos/all', async (query: QueryParams) => {
	return await RepositoriesService.getAllRepos(query)
})

const repositoriesSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {
		setRepos: (state: ReposState, action: PayloadAction<RepoPage>) => {
			state.result = action.payload
		},
		setPage: (state: ReposState, action: PayloadAction<string>) => {
			state.page = action.payload
		},
		setPrePage: (state: ReposState, action: PayloadAction<string>) => {
			state.proPage = action.payload
		},
		setlanguage: (state: ReposState, action: PayloadAction<string>) => {
			if (action.payload)
				state.search = `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}+language=${action.payload}`
			else
				state.search = `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}`
		},
		setShowStared: (state: ReposState, action: PayloadAction<boolean>) => {
			state.showStared = action.payload
		},
		setStared: (state: ReposState, action: PayloadAction<Array<Repository>>) => {
			state.stared = action.payload
		},
		star: (state: ReposState, action: PayloadAction<Repository>) => {
			state.stared.push(action.payload)
			localStorage.setItem('stared', JSON.stringify(state.stared))
		},
		unstar: (state: ReposState, action: PayloadAction<Repository>) => {
			state.stared = state.stared.filter( repo => repo.id != action.payload.id )
			localStorage.setItem('stared', JSON.stringify(state.stared))
		},
	},
	extraReducers: builder => {
		builder.addCase(getRepos.pending, (state, _) => {
			state.loading = true
		}).addCase(getRepos.rejected, (state, action) => {
			state.error = action.error
		}).addCase(getRepos.fulfilled, (state, action) => {
			state.loading = false
			// Don't use window.history.pushState() here in production
            // It's better to keep redirections predictable
            window.history.pushState({
					page: state.page,
					proPage: state.proPage,
					order: state.order,
					sort: state.sort,
					search: state.search,
				}, 
				"Trending Github Repositories", 
				`?q=${state.search}&order=${state.order}&sort=${state.sort}&proPage=${state.proPage}&page=${state.page}`
			)
			state.result = action.payload
		})
	}
})

export const { 
	setRepos, 
	setPage, 
	setPrePage, 
	setlanguage,
	setStared,
	setShowStared,
	star,
	unstar,
} = repositoriesSlice.actions

// List of selectors
export const selectState = (state: RootState) => state.repos

export const selectRepos = (state: RootState) => state.repos.result

export const selectLanguage = (state: RootState) => state.repos.search.substr(29, state.repos.search.length)

export const selectProPage = (state: RootState) => state.repos.proPage

export const selectPage = (state: RootState) => state.repos.page

export const selectloading = (state: RootState) => state.repos.loading

export const selectStared = (state: RootState) => state.repos.stared

export const selectShowStared = (state: RootState) => state.repos.showStared

export const setReposAsync = (repos: RepoPage): AppThunk => dispatch => {
	setTimeout(() => {
		dispatch(setRepos(repos))
	})
}

export const setQueryParamsAsync = (query: QueryParams): AppThunk => dispatch => {
	setTimeout(() => {
		dispatch(setPage((query.page as string)))
		dispatch(setPrePage((query.proPage as string)))
		dispatch(setlanguage((query.q as string).substr(29, (query.q as string).length)))
	})
}

export const loadRepositoriesPage =
	(page: string): AppThunk =>
		(dispatch, getState) => {
			dispatch(setPage(page))
			const repos = selectState(getState())
			const query: QueryParams = {
				q: repos.search,
				order: repos.order,
				sort: repos.sort,
				page: repos.page,
				proPage: repos.proPage,
			}
			
			dispatch(getRepos(query))
		}


export const changePerPage =
	(perPage: string): AppThunk =>
		(dispatch, getState) => {
			dispatch(setPrePage(perPage))
			dispatch(setPage('1'))
			const repos = selectState(getState())
			
			const query: QueryParams = {
				q: repos.search,
				order: repos.order,
				sort: repos.sort,
				page: repos.page,
				proPage: repos.proPage,
			}
			
			dispatch(getRepos(query))
		}

export const filterRepositoriesByLanguage =
	(language: string): AppThunk =>
		(dispatch, getState) => {
			dispatch(setlanguage(language))
			const repos = selectState(getState())
			
			const query: QueryParams = {
				q: repos.search,
				order: repos.order,
				sort: repos.sort,
				page: repos.page,
				proPage: repos.proPage,
			}
			
			dispatch(getRepos(query))
		}


export default repositoriesSlice.reducer
