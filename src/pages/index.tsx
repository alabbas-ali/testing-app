import React, { ReactNode, useEffect } from 'react'
import App from '../home'
import { useDispatch } from 'react-redux'
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextPage,
} from 'next'
import RepositoriesService from '../service/RepositoriesService'
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

	const repos = await RepositoriesService.getAllRepos(context.query)

	return {
		props: {
			repos
		},
	}
}
