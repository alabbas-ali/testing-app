import React, { ReactNode, useEffect } from 'react'
import App from '../home'
import { useDispatch } from 'react-redux'
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import RepositoriesService, { QueryParams } from '../service/RepositoriesService'
import { setQueryParamsAsync, setReposAsync } from '../store/repositoriesSlice'
import { RepoPage } from '../models/repo.page'

interface IServerProps {
	repos: RepoPage
	query: QueryParams
	children?: ReactNode
}

const IndexPage: NextPage = (props: IServerProps) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setQueryParamsAsync(props.query))
	}, [dispatch, props.query])

	useEffect(() => {
		dispatch(setReposAsync(props.repos))
	}, [dispatch, props.repos])

	return (<App />)
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<any>) => {

	const query: QueryParams = {
		q: context.query.q || null,
		sort: context.query.sort || 'stars',
		order: context.query.order || 'desc',
		proPage: context.query.proPage || 20,
		page: context.query.page || 1,
	}
	
	const repos = await RepositoriesService.getAllRepos(query)

	return {
		props: {
			repos,
			query,
		},
	}
}
