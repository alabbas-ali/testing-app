import Document, { Html, Head, Main, NextScript } from 'next/document'

/**
 * this get executed only on the server.
 * it is usefull for difining what is included in our app in total
 */
export default class CustomDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head></Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}