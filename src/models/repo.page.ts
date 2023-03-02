import { Customer } from './repo'

export interface RepoPage {
    customers: Array<Customer>
    pagination: {
        page: number
        per_page: number
        total_pages: number
    }
}
