import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />
  <link rel="icon" href="/bharat sarathi logo.png" type="image/png" />
  {/* iOS meta tags */}
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-mobile-web-app-title" content="Bharat Sarathi" />
  <link rel="apple-touch-icon" href="/bharat sarathi logo.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
