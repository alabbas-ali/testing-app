import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RepoItem from './item'
import { 
	loadExactRepositoriesPage, 
	loadNewRepositoriesPage, 
	ReposState, 
	selectRepos,
} from '../../store/repositoriesSlice'

import styles from './listing.module.scss'

function RepoListing() {
	const repositores: ReposState = useSelector(selectRepos)

	const dispatch = useDispatch()

	const nextPage = (): void => {
		dispatch(loadNewRepositoriesPage(1))
	}

	const previousPage = (): void => {
		dispatch(loadNewRepositoriesPage(-1))
	}

	const goToPage = (page): void => {
		dispatch(loadExactRepositoriesPage(page))
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

			<nav className={styles.pagination} role="navigation" aria-label="pagination">
				<button
					className={styles.button + styles.pagination_previous}
					onClick={() => previousPage()}
				>
					Previous page
				</button>
				<button
					className={styles.button + styles.pagination_next}
					onClick={() => nextPage()}
				>
					Next page
				</button>
				<ul className={styles.pagination_list}>
					{
						// for (let index = 1; index < (repositores.result.total_count / repositores.resultsPerPage); index ++ ) {
						// 	<button
						// 		key={index}
						// 		className={`button pagination-link ${this.props.state.currentPage === index + 1 ? "is-current" : ""}`}
						// 		aria-label="Page 1"
						// 		onClick={() => goToPage(index + 1)}
						// 		aria-current="page"
						// 	>
						// 		{index + 1}
						// 	</button>
						// )
					}
				</ul>
			</nav>
		</section>
	</>)
}

export default RepoListing