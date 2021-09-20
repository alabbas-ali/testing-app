import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import RepoItem from './item'
import {
	loadRepositoriesPage, 
	ReposState, 
	selectRepos,
} from '../../store/repositoriesSlice'

import styles from './listing.module.scss'

function RepoListing() {
	const repositores: ReposState = useSelector(selectRepos)

	const dispatch = useDispatch()

	const goToPage = (page): void => {
		dispatch(loadRepositoriesPage(page.selected + 1))
	}
	
	return (<>
		<section className={styles.section}>
			{
				repositores.result &&
				repositores.result.items &&
				repositores.result.items.length &&
				repositores.result.items.map(item => 
					<RepoItem key={item.id} repo={item} />
				)
			}
		</section>

		<section className={styles.section}>
			<ReactPaginate 
				pageCount={
					// it is only the first 1000 search results are available feo github
					repositores?.result?.total_count > 1000 
					? 1000 / repositores.proPage
					: repositores?.result?.total_count / repositores.proPage
				}
				initialPage={repositores.page - 1}
				onPageChange={goToPage}
				containerClassName={styles.paginate}
				activeClassName={styles.active}
			></ReactPaginate>
		</section>
	</>)
}

export default RepoListing