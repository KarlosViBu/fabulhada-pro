import { Html, Head, Main, NextScript } from 'next/document'
import { font3 } from '@/components/ui'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Farsan&family=Saira+Extra+Condensed:wght@200;400;600&family=Truculenta:wght@300;500;800&display=swap" rel="stylesheet"/>
      <body className={font3.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
