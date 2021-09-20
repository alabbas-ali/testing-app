import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import { filterRepositoriesByLanguage } from '../../store/repositoriesSlice'

import styles from './filters.module.scss'

function RepoFilters() {

	const languages = [
		{ label: 'All', value: null },
		{ label: 'TypeScript', value: 'typescript' },
		{ label: 'JavaScript', value: 'js' },
		{ label: 'Java', value: 'java' },
		{ label: 'Python', value: 'python' },
		{ label: 'C', value: 'c' },
		{ label: "Html", value: 'html' },
		{ label: "Go", value: 'go' }
	]

	const dispatch = useDispatch()

	const filterLanguage = (event): void => {
		dispatch(filterRepositoriesByLanguage(event.value))
	}

	return (
		<section className={styles.control}>
			<Select
				id="react-select-input"
				options={languages}
				onChange={filterLanguage}
			/>
		</section>
	)
}

export default RepoFilters