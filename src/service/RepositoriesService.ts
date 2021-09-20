import moment from "moment"

export default class RepositoriesService {

	static async getAllRepos(query) {

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
		if (query.order) url += `&order=${query.order}`
		if (query.numberOfRests) url += `&numberOfRests=${query.numberOfRests}`
		if (query.page) url += `&page=${query.page}`

		const response = await fetch( url )
		const data = await response.json()
		return data
	}
}

