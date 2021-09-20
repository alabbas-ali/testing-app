import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from './components/footer'
import RepoFilters from './components/repos/filters'
import RepoListing from './components/repos/listing'

import styles from './home.module.scss'
import { setStared } from './store/repositoriesSlice'

const ISSERVER = typeof window === "undefined"

function Home() {
	const dispatch = useDispatch()

	useEffect(() => {
		if(!ISSERVER) dispatch(setStared(JSON.parse(localStorage.getItem('stared')) || []))
	})

	return (<>
		<Head>
			<title>Trending Github Repositories</title>
			<meta name="description" content="discovering trending github repositories on GitHub" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className={styles.container}>

			<RepoFilters />

			<RepoListing />

			<Footer />

		</div>
	</>)
}

export default Home
