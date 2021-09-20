import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { changePerPage, filterRepositoriesByLanguage, selectLanguage, selectProPage } from '../../store/repositoriesSlice'

import styles from './filters.module.scss'

function RepoFilters() {

	const language: string = useSelector(selectLanguage)

	const propage: number = useSelector(selectProPage)

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

	const propages = [
		{ label: '10 pre page', value: 10 },
		{ label: '50 pre page', value: 50 },
		{ label: '100 pre page', value: 100 }
	]

	const dispatch = useDispatch()

	const filterLanguage = (event): void => {
		dispatch(filterRepositoriesByLanguage(event.value))
	}

	const filterPerPage = (event): void => {
		dispatch(changePerPage(event.value))
	}

	return (
		<section className={styles.control}>

			<Select
				id="langauge-select-input"
				value={languages.filter(l => l.value === language)}
				options={languages}
				onChange={filterLanguage}
				defaultValue={languages[0]}
				className={styles.input}
				placeholder="Language"
			/>

			<Select
				id="prepage-select-input"
				value={propages.filter(p => p.value === propage)}
				options={propages}
				defaultValue={propages[0]}
				onChange={filterPerPage}
				className={styles.input}
				placeholder="Result Per Page"
			/>
		</section>
	)
}

export default RepoFilters