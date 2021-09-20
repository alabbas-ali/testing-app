import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { AppThunk, RootState } from '.'
import { RepoPage } from "../models/repo.page"
import RepositoriesService from "../service/RepositoriesService"

export interface ReposState {
	result: RepoPage
	page: number
	proPage: number
	language: string
	search: string
	loading: boolean
	error: any
}

//https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc
export const initialState: ReposState = {
	result: null,
	page: 1,
	proPage: 10,
	language: null,
	search: `created:>${moment().subtract(1, 'week').format('YYYY-MM-DD')}`,
	loading: true,
	error: null
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getRepos = createAsyncThunk('repos/all', async (query) => {
	return await RepositoriesService.getAllRepos(query)
})

const repositoriesSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {
		setRepos: (state, action: PayloadAction<RepoPage>) => {
			state.result = action.payload
		},

		loadNewRepositoriesPage : (state, action: PayloadAction<number>) => {

		},

		loadExactRepositoriesPage : (state, action: PayloadAction<number>) => {

		},

		filterRepositoriesByLanguage: (state, action: PayloadAction<string>) => {

		}

		// onSearch: state => {
		// 	const isMatched = (value: string) => value.toLowerCase().includes(state.searchText.toLowerCase())
		// 	const filterRepos = (post: Repository) => { }
		// 	state.isSearch = true
		// 	if (state.searchText !== '') {
		// 		const repos = state.repos
		// 		const searchResults = state.repos.items.filter(filterRepos)
		// 		state.searchResults = searchResults
		// 		state.showingPost = findFirstPost(searchResults)

		// 	} else {
		// 		state.searchResults = []
		// 		state.isSearch = false
		// 		state.showingPost = findFirstPost(state.bloggerRepos.Repos)
		// 	}
		// }
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

export const setReposAsync = (repos: RepoPage): AppThunk => dispatch => {
	setTimeout(() => {
		dispatch(setRepos(repos))
	})
}

export const {
	setRepos, 
	loadNewRepositoriesPage, 
	loadExactRepositoriesPage, 
	filterRepositoriesByLanguage,
} = repositoriesSlice.actions


// const onSearchAsync = (): AppThunk => dispatch => {
// 	setTimeout(() => {
// 		dispatch(onSearch())
// 	}, 200)
// }

// List of selectors
export const selectRepos = (state: RootState) => state.repos

// const selectShowingPost = (state: RootState) =>
// 	state.blogRepos.showingPost

// const selectShowingPostId = (state: RootState) =>
// 	state.blogRepos?.showingPost?.id ?? 0

// const selectSearchText = (state: RootState) =>
// 	state.blogRepos.searchText

// const selectSelectedSearchOn = (state: RootState) =>
// 	state.blogRepos.selectedSearchOn



export default repositoriesSlice.reducer
