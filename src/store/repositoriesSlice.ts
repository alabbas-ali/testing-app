import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { AppThunk, RootState } from '.'
import { RepoPage } from "../models/repo.page"
import RepositoriesService, { QueryParams } from "../service/RepositoriesService"

export interface ReposState {
	result: RepoPage
	page: number
	proPage: number
	order: string,
	sort: string,
	search: string
	loading: boolean
	error: any
}

export const initialState: ReposState = {
	result: null,
	page: 1,
	proPage: 20,
	order: 'desc',
	sort: 'stars',
	search: `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}`,
	loading: true,
	error: null
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
		setPage: (state: ReposState, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setPrePage: (state: ReposState, action: PayloadAction<number>) => {
			state.proPage = action.payload
		},
		setlanguage: (state: ReposState, action: PayloadAction<string>) => {
			state.search = `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}+language=${action.payload}`
		},
	},
	extraReducers: builder => {
		builder.addCase(getRepos.pending, (state, _) => {
			state.loading = true
		}).addCase(getRepos.rejected, (state, action) => {
			state.error = action.error
		}).addCase(getRepos.fulfilled, (state, action) => {
			state.loading = false
			state.result = action.payload
		})
	}
})

export const { setRepos, setPage, setPrePage, setlanguage } = repositoriesSlice.actions

// List of selectors
export const selectRepos = (state: RootState) => state.repos

export const selectLanguage = (state: RootState) => state.repos.search.substr(30, state.repos.search.length)

export const selectProPage = (state: RootState) => state.repos.proPage

export const setReposAsync = (repos: RepoPage): AppThunk => dispatch => {
	setTimeout(() => {
		dispatch(setRepos(repos))
	})
}

export const loadRepositoriesPage =
	(page: number): AppThunk =>
		(dispatch, getState) => {
			dispatch(setPage(page))

			const repos = selectRepos(getState())
			
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
	(perPage: number): AppThunk =>
		(dispatch, getState) => {

			dispatch(setPrePage(perPage))

			const repos = selectRepos(getState())
			
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

			const repos = selectRepos(getState())
			
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
