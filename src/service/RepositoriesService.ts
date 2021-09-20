import moment from "moment"
import { RepoPage } from "../models/repo.page"

export interface QueryParams {
	q: string | string[]
	sort?: string | string[]
	order?: string | string[]
	proPage: number | string | string[]
	page: number | string | string[]
}

//https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc

export default class RepositoriesService {

	static async getAllRepos(query: QueryParams): Promise<RepoPage> {

		let url = 'http://localhost:3000/api/search?'

		/**
		 * checking if the query request include filter for data or not 
		 * if not define a filter to start from last week 
		 */
		const lastweek = moment().subtract(1, 'week').format('YYYY-MM-DD')
		if (query.q) {
			if (!query.q.includes('created:>')) {
				query.q += `+created:>${lastweek}`
			}
		} else
			query.q = `created:>${lastweek}`
		url += `q=${query.q}`

		if (query.sort) url += `&sort=${query.sort}` 
		else url += `&sort=stars`
		if (query.order) url += `&order=${query.order}`
		else url += `&order=desc`
		if (query.proPage) url += `&proPage=${query.proPage}`
		else url += `&numberOfRests=20`
		if (query.page) url += `&page=${query.page}`
		else url += `&page=1`

		const response = await fetch( url )
		const data = await response.json()
		return data
	}
}

