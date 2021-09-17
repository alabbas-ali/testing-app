import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import moment from 'moment'

import styles from '../styles/Home.module.scss'


function createTasks(repo) {
	console.log('repo', repo)
    return (
		<a key={repo.id} href={repo.html_url} className={styles.card} target="_blank" rel="noreferrer">
			<h2> {repo.name}</h2>
			<p>{repo.description}</p>
		</a>
	)
}

export default function Home({repos}) {

	const { query } = useRouter()
	const lastweek = moment().subtract(1, 'week').format('YYYY-MM-DD')

	/**
	 * checking if the query request include filter for data or not 
	 * if not define a filter to start from last week 
	 */
	if (query.q) {
		if (!query.q.includes('created:>')) { 
			query.q += `+created:>${lastweek}`
		}
	} else 
		query.q = `created:>${lastweek}`

	const reposEntries = repos.items
	const listItems = reposEntries.map(createTasks)

	return (
		<div className={styles.container}>
			<Head>
				<title>Trending Github Repositories</title>
				<meta name="description" content="discovering trending github repositories on GitHub" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.grid}>
					{listItems}
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}


/**
 * NextJs server side rendring for fetching the data to the rendered page
 * @param {*} params 
 * @returns 
 */
export async function getServerSideProps({query}) {
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

    const req = await fetch(url)
    const data = await req.json()
    return {
        props: {
            repos: data
        },
    }
}
