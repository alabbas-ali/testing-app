import Head from 'next/head'
import React from 'react'
import Footer from './components/footer'
import RepoFilters from './components/repos/filters'
import RepoListing from './components/repos/listing'

import styles from './home.module.scss'

function home() {
	return (<>
		<Head>
			<title>Trending Github Repositories</title>
			<meta name="description" content="discovering trending github repositories on GitHub" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className={styles.container}>

			<RepoFilters />

			<RepoListing />

			<Footer />
		</div>
	</>)
}

export default home
