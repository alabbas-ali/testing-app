import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import RepoItem from './item'
import {
	loadRepositoriesPage,  
	selectPage, 
	selectProPage, 
	selectRepos,
} from '../../store/repositoriesSlice'
import { RepoPage } from '../../models/repo.page'

import styles from './listing.module.scss'

function RepoListing() {
	const repositores: RepoPage = useSelector(selectRepos)

	const proPage = useSelector(selectProPage)

	const currentPage = useSelector(selectPage)

	const dispatch = useDispatch()

	const goToPage = (page): void => {
		if ( currentPage != (page.selected + 1) )
			dispatch(loadRepositoriesPage(page.selected + 1))
	}
	
	return (<>
		<section className={styles.section}>
			{
				repositores &&
				repositores.items &&
				repositores.items.length &&
				repositores.items.map(item => 
					<RepoItem key={item.id} repo={item} />
				)
			}
		</section>

		<section>
			<ReactPaginate 
				pageCount={
					// it is only the first 1000 search results are available feo github
					repositores?.total_count > 1000 
					? 1000 / proPage
					: repositores?.total_count / proPage
				}
				initialPage={currentPage - 1}
				onPageChange={goToPage}
				containerClassName={styles.paginate}
				activeClassName={styles.active}
			></ReactPaginate>
		</section>
	</>)
}

export default RepoListing