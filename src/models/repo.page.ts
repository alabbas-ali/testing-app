import { Repository } from './repo'

export interface RepoPage {
    total_count: number
    incomplete_results: boolean
    items: Array<Repository>
}
