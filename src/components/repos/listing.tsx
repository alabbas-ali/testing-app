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
import { Customer } from '../../models/repo'

import styles from './listing.module.scss'

function RepoListing() {

	const customers: RepoPage = useSelector(selectRepos)
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
				customers?.customers &&
				customers?.customers.length &&
				customers?.customers.map(item => 
					<RepoItem key={item.id} repo={item} />
				)
			}
		</section>

		<section>
			  <ReactPaginate
					pageCount={
						customers?.pagination.total_pages
					}
					initialPage={parseInt(currentPage)}
					onPageChange={goToPage}
					containerClassName={styles.paginate}
					activeClassName={styles.active}
				></ReactPaginate>
			
		</section>
	</>)
}

export default RepoListing
