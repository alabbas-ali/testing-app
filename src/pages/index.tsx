import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'
import {
	GetServerSideProps,
	NextPage,
} from 'next'

import {
	setQueryParamsAsync,
	setStared,
} from '../store/repositoriesSlice'

import { QueryParams } from '../service/RepositoriesService'
import { wrapper } from '../store'
import RepoFilters from '../components/repos/filters'
import RepoListing from '../components/repos/listing'
import Footer from '../components/footer/footer'
import styles from './index.module.scss'


const ISSERVER = typeof window === "undefined"

const IndexPage: NextPage = () => {
	const dispatch = useDispatch()

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		if (!ISSERVER) dispatch(setStared(JSON.parse(localStorage.getItem('stared')) || []))
	})

	return (<>
		<Head>
			<title>Trending Github Repositories</title>
		</Head>
		<div className={styles.container}>

			<RepoFilters />

			<RepoListing />

			<Footer />

		</div>
	</>)
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const query: QueryParams = {
			query: context.query.query || '',
			page: context.query.page || 0,
		}

		await store.dispatch(setQueryParamsAsync(query))

		return {
			props: {},
		}
	})
