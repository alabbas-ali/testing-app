import React from 'react'
import styles from './item.module.scss'

function RepoItem(props) {
	return (
		<div className={styles.card} >
			<a href={props.repo.html_url} target="_blank" rel="noreferrer">
				<h2>
					{props.repo.name}
				</h2>
			</a>
			<button aria-label='star' />
			<p>{props.repo.description}</p>
		</div>
	)
}

export default RepoItem