// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'

/**
 * This is the proxy endpoint that provides 
 * • A list of the most popular repositories, sorted by number of stars.
 * • An option to be able to view the top 10, 50, 100 repositories should be available.
 * • Given a date, the most popular repositories created from this date onwards should be returned.
 * • A filter for the programming language would be a great addition to have.
 * The end point map the https://api.github.com/search/repositories read more about it :
 * https://docs.github.com/en/rest/reference/search
 * 
 * 
 * language:javascript
 * this is the end point /api/search
 * @param req the request query parametes includes:
 * *** q : string | contains a search keywords and qualifiers https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-code
 * *** sort : string | Sorts the results of your query. Can only be indexed, which indicates how recently a file has been indexed by the GitHub search infrastructure.
 * *** order : string | Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc)
 * *** numberOfRests : integer | Results per page (max 100) Default: 30
 * *** page : integer | Page number of the results to fetch. Default: 1
 * @param res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { q, sort, order, numberOfRests, page} = req.query
	let url = "https://api.github.com/search/repositories?"
	if (q) url += `q=${q}`
	if (sort) url += `&sort=${sort}`
	if (order) url += `&order=${order}`
	if (numberOfRests) url += `&per_page=${numberOfRests}`
	if (page) url += `&page=${page}`
	const response = await fetch( url )
	const data = await response.json()
	res.status(200).json( data )
}
