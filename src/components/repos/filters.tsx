import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { 
	changePerPage, 
	filterRepositoriesByLanguage, 
	selectLanguage, 
	selectProPage, 
	selectShowStared, 
	setShowStared 
} from '../../store/repositoriesSlice'

import styles from './filters.module.scss'

function RepoFilters() {

	const language: string = useSelector(selectLanguage)
	const showStared: boolean = useSelector(selectShowStared)
	const proPage = useSelector(selectProPage)

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
		{ label: '10 pre page', value: '10' },
		{ label: '50 pre page', value: '50' },
		{ label: '100 pre page', value: '100' }
	]

	const dispatch = useDispatch()

	const filterLanguage = (event): void => {
		dispatch(filterRepositoriesByLanguage(event.value))
	}

	const filterPerPage = (event): void => {
		dispatch(changePerPage(event.value))
	}

	const changeDisplay = (show: boolean): void => {
		dispatch(setShowStared(show))
	}

	return (
		<section className={styles.control}>

			<div className={styles.tabs}>
				<a 
					href="#" 
					className={!showStared ? styles.active : null} 
					onClick={() => changeDisplay(false)} 
				> Overview </a>
				<a 
					href="#" 
					className={showStared ? styles.active : null} 
					onClick={() => changeDisplay(true)} 
				> Stared </a>
			</div>

			<div className={styles.filters}>
				<Select
					id="langauge-select-input"
					value={languages.filter(l => l.value === language)}
					options={languages}
					onChange={filterLanguage}
					defaultValue={languages[0]}
					className={styles.input}
					placeholder="Language"
					disabled={showStared}
				/>

				<Select
					id="prepage-select-input"
					value={propages.filter(p => p.value === proPage)}
					options={propages}
					defaultValue={propages[0]}
					onChange={filterPerPage}
					className={styles.input}
					placeholder="Result Per Page"
					disabled={showStared}
				/>
			</div>
		</section>
	)
}

export default RepoFilters