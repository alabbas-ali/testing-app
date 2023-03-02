import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Customer } from '../../models/repo'
import { selectStared, star, unstar } from '../../store/repositoriesSlice'
import styles from './item.module.scss'

function RepoItem(props: { repo: Customer }) {

	const staredRepo = useSelector(selectStared)

	const dispatch = useDispatch()

	const starRepo = (item: Customer): void => {
		dispatch(star(item))
	}

	const unstarRepo = (item: Customer): void => {
		dispatch(unstar(item))
	}

	let found = false

	staredRepo.map(s => {
		if (s.id === props.repo.id) {
			found = true
			return
		}
	})


	return (
		<div className={styles.item} >
			<h2>
				{props.repo.name}
			</h2>
			{props.repo.email}
			<p>{props.repo.city}</p>
		</div>
	)
}

export default RepoItem