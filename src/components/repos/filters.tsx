import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import { filterRepositoriesByLanguage } from '../../store/repositoriesSlice'

import styles from './filters.module.scss'

function RepoFilters() {

	const languages = [
		{ label: 'All', value: null },
		{ label: 'TypeScript', value: 'ts' },
		{ label: 'JavaScript', value: 'js' },
		{ label: 'Java', value: 'java' },
		{ label: 'Python', value: 'python' },
		{ label: 'C', value: 'c' },
		{ label: "Html", value: 'html' },
		{ label: "Go", value: 'go' }
	]

	const dispatch = useDispatch()

	const filterLanguage = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(filterRepositoriesByLanguage(event.target.value))
	}

	return (
		<div className={styles.control}>
			<Select
				options={languages}
				onChange={filterLanguage}
			/>
		</div>
	)
}

export default RepoFilters