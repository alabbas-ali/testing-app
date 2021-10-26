import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import RepoItem from './item'
import {
	loadRepositoriesPage,  
	selectloading,  
	selectPage, 
	selectProPage, 
	selectRepos,
	selectShowStared,
	selectStared,
} from '../../store/repositoriesSlice'
import { RepoPage } from '../../models/repo.page'
import { Repository } from '../../models/repo'

import styles from './listing.module.scss'

function RepoListing() {

	const repositores: RepoPage = useSelector(selectRepos)
	const staredRepos: Array<Repository> = useSelector(selectStared)
	const showStared: boolean = useSelector(selectShowStared)
	const proPage: string = useSelector(selectProPage)
	const currentPage: string = useSelector(selectPage)
	const isLoading: boolean = useSelector(selectloading)

	const dispatch = useDispatch()

	const goToPage = (page): void => {
		if ( currentPage != (page.selected + 1) )
			dispatch(loadRepositoriesPage(page.selected + 1))
	}
	
	return (<>
		<section className={styles.section}>
			{
				isLoading 
				? <div className={styles.loading}> 
					<div className={styles.loader}>
						<div className={styles.loader_wheel}></div>
						<div className={styles.loader_text}></div>
					</div>
				 </div> 
				 : <></>
			}

			{
				!showStared &&
				repositores?.items &&
				repositores?.items.length &&
				repositores?.items.map(item => 
					<RepoItem key={item.id} repo={item} />
				)
			}

			{
				showStared &&
				staredRepos &&
				staredRepos.length &&
				staredRepos.map(item => 
					<RepoItem key={item.id} repo={item} />
				)
			}
		</section>

		<section>
			{ !showStared ? <ReactPaginate
					pageCount={
						// it is only the first 1000 search results are available feo github
						repositores?.total_count > 1000 
						? 1000 / parseInt(proPage)
						: repositores?.total_count / parseInt(proPage)
					}
					initialPage={parseInt(currentPage) - 1}
					onPageChange={goToPage}
					containerClassName={styles.paginate}
					activeClassName={styles.active}
				></ReactPaginate>
				: <></>
			}
		</section>
	</>)
}

export default RepoListing
