import Document, { Html, Head, Main, NextScript } from 'next/document'

/**
 * this get executed only on the server.
 * it is usefull for difining what is included in our app in total
 */
export default class CustomDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta name="description" content="discovering trending github repositories on GitHub" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}