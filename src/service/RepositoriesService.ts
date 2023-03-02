import { RepoPage } from '../models/repo.page'

export interface QueryParams {
	query: string | string[]
	page: number | string | string[]
}

export default class CustomerService {

	//private absolute_url = absoluteUrl()

	static async getAllRepos(query: QueryParams): Promise<RepoPage> {

		let url = `http://localhost:3000/api/search?`
		url += `query=${query.query}`
		if (query.page) url += `&page=${query.page}`
		else url += `&page=0`

		const response = await fetch(url)
		const data = await response.json()
		return data
	}
}

