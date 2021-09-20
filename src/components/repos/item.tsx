import React from 'react'
import { Repository } from '../../models/repo'
import styles from './item.module.scss'

function RepoItem(props: { repo:Repository}) {
	return (
		<div className={styles.card} >
			<a href={props.repo.html_url} target="_blank" rel="noreferrer">
				<h2>
					{props.repo.full_name} ({props.repo.language})
				</h2>
			</a>
			<button aria-label='star' > Star </button>
			<p>{props.repo.description}</p>
		</div>
	)
}

export default RepoItem