import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class AppDocument extends Document {
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(context)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#0369A1" />
          <link rel="manifest" href="/projectfusion.webmanifest" />
        </Head>
        <body className="select-none">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
