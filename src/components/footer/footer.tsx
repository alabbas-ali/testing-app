import React from 'react'
import styles from './footer.module.scss'

function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.logo}>
                © 2021 Copyright: <a href="" target="_blank"> Alabbas Alhaj Ali </a>
            </span>
        </footer>
    )
}

export default Footer
