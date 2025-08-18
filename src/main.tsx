import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import CountryPage from './pages/CountryPage.tsx'
import HomePage from './pages/HomePage.tsx'

import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(en)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path=":country" element={<CountryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
