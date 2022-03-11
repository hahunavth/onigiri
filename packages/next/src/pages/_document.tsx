import { getInitialProps } from '@expo/next-adapter/document'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <title>Example</title> */}
          {/* <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta key="title" name="title" content="Example" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" /> */}
          {/* <link
          href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
          rel="stylesheet"
        /> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="//fonts.googleapis.com/css?family=Quicksand"
          />
          {/* <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
            name="viewport"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = getInitialProps

export default Document
