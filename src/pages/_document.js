import Document, { Html, Head, Main, NextScript } from 'next/document';
import '../styles/normalize.css';
import breakpoint from '../styles/breakpoints.scss';

class MyDocument extends Document {
    render() {
        return (
            <>
                <Html lang="en">
                    <Head />
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Html>

                <style global jsx>{`
                    html {
                        font-size: calc(1em * 0.625);
                    }

                    body {
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont,
                            'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                            'Cantarell', 'Fira Sans', 'Droid Sans',
                            'Helvetica Neue', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }

                    code {
                        font-family: source-code-pro, Menlo, Monaco, Consolas,
                            'Courier New', monospace;
                    }

                    h1 {
                        font-size: 2.4rem;
                    }

                    p,
                    ul,
                    ol,
                    li,
                    a {
                        font-size: 1.6rem;
                        line-height: 1.4;
                    }

                    ul,
                    ol,
                    li {
                        list-style: none;
                    }

                    .row {
                        display: flex;
                        flex-direction: column;
                    }

                    @media ${breakpoint.tablet} {
                        .row {
                            flex-direction: row;
                        }
                    }

                    .main {
                        width: 100%;
                    }

                    .content {
                        max-width: 144rem;
                        margin: 0 auto;
                        padding: 0 2rem;
                    }
                `}</style>
            </>
        );
    }
}

export default MyDocument;
