import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Repository } from '../../models/repo'
import { selectStared, star, unstar } from '../../store/repositoriesSlice'
import styles from './item.module.scss'

function RepoItem(props: { repo: Repository }) {

	const staredRepo = useSelector(selectStared)

	const dispatch = useDispatch()

	const starRepo = (item: Repository): void => {
		dispatch(star(item))
	}

	const unstarRepo = (item: Repository): void => {
		dispatch(unstar(item))
	}

	let found = false

	let button

	staredRepo.map(s => {
		if (s.id === props.repo.id) {
			found = true
			return
		}
	})

	if (found) {
		button = <button className={styles.star} aria-label='star' onClick={() => unstarRepo(props.repo)} > Unstar </button>
	} else {
		button = <button className={styles.unstar} aria-label='star' onClick={() => starRepo(props.repo)} > Star </button>
	}

	return (
		<div className={styles.item} >
			<a href={props.repo.html_url} target="_blank" rel="noreferrer">
				<h2>
					{props.repo.full_name} ({props.repo.language})
				</h2>
			</a>
			{button}
			<p>{props.repo.description}</p>
		</div>
	)
}

export default RepoItem