
import React from 'react'
import { AppProps } from 'next/app'
// import { Provider } from 'react-redux'
// import { store } from '../store'
import { wrapper } from '../store'
import './index.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<Component {...pageProps} />
		</React.StrictMode>
	)
}

export default wrapper.withRedux(MyApp)
