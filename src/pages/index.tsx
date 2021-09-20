import React, { ReactNode, useEffect } from 'react'
import App from '../home'
import { useDispatch } from 'react-redux'
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import RepositoriesService, { QueryParams } from '../service/RepositoriesService'
import { setReposAsync } from '../store/repositoriesSlice'

interface IServerProps {
	repos: any
	children?: ReactNode
}

const IndexPage: NextPage = (props: IServerProps) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setReposAsync(props.repos))
	}, [dispatch, props.repos])
	return (<App />)
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<any>) => {

	const query: QueryParams = {
		q: context.query.q,
		sort: context.query.sort,
		order: context.query.order,
		proPage: context.query.proPage,
		page: context.query.page,
	}
	
	const repos = await RepositoriesService.getAllRepos(query)

	return {
		props: {
			repos
		},
	}
}
