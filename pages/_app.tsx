import '@/styles/globals.css' // Adjust path if you use a styles folder
import type { AppProps } from 'next/app'
import { LanguageProvider } from '@/context/LanguageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      
    </LanguageProvider>
  )
}