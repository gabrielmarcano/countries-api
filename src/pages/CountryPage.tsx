import { Link, useParams, useOutletContext, useLocation } from 'react-router'
import { useAlpha } from '../api/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrophy } from '@fortawesome/free-solid-svg-icons'
import type { AlphaResponse } from '../api/types'
import { useState, useEffect } from 'react'

import countries from 'i18n-iso-countries'

interface GameContextType {
  targetCountry: AlphaResponse
  startCountry: AlphaResponse
}

function CountryPage() {
  const { countryCode } = useParams()
  const location = useLocation()

  // Detect mode based on URL
  const isGameMode = location.pathname.startsWith('/play')
  const gameContext = useOutletContext<GameContextType | null>()

  const {
    data: countryData,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
  } = useAlpha(countryCode!, {
    enabled: !!countryCode,
  })

  const theCountry = countryData?.data

  // Win Logic
  const [hasWon, setHasWon] = useState(false)

  useEffect(() => {
    if (isGameMode && gameContext?.targetCountry && theCountry) {
        if (gameContext.targetCountry.cca3 === theCountry.cca3) {
            setHasWon(true)
        }
    }
  }, [isGameMode, gameContext, theCountry])


  return (
    <>
      {hasWon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
              <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-800 animate-bounce-in">
                  <div className="rounded-full bg-yellow-100 p-6 text-yellow-500 dark:bg-yellow-900/30">
                      <FontAwesomeIcon icon={faTrophy} size="3x" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">You Won!</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                      You successfully navigated from <strong>{gameContext?.startCountry.name.common}</strong> to <strong>{theCountry?.name.common}</strong>!
                  </p>
                  <div className="flex w-full gap-4">
                      <Link to="/" className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                          Home
                      </Link>
                      <Link to="/play" onClick={() => window.location.href = '/play'} className="w-full rounded-lg bg-brand-600 px-4 py-3 font-bold text-white shadow-lg transition-colors hover:bg-brand-500">
                          Play Again
                      </Link>
                  </div>
              </div>
          </div>
      )}

      <div className="flex w-full flex-col items-center p-6 py-12 lg:p-20 lg:py-16">
        {!isGameMode && (
             <div className="mb-16 w-full">
             <Link
               to="/browse"
               className="flex w-32 items-center justify-center rounded-lg bg-white py-3 text-text-main-light shadow-md transition-transform hover:-translate-x-1 dark:bg-dark-element dark:text-white"
             >
               <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
               <span className="font-semibold">Back</span>
             </Link>
           </div>
        )}

        {theCountry && <CountryInformation country={theCountry} isGameMode={isGameMode} />}

        {isLoadingCountry && <CountryInformationSkeleton />}

        {isErrorCountry && <p className="text-red-500 dark:text-red-400 font-bold">Error loading country data. Please try again.</p>}
      </div>
    </>
  )
}

export default CountryPage

function CountryInformation({ country, isGameMode }: { country: AlphaResponse, isGameMode: boolean }) {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-12 md:flex-row">
        <div className="w-full md:w-1/2">
             <img
            src={country.flags.png}
            alt={country.name.common + ' flag'}
            className="h-auto w-full rounded-lg shadow-lg dark:shadow-black/30 object-cover"
            />
        </div>

        <div className="flex w-full flex-col gap-12 lg:gap-8 md:w-1/2">
          <div className="flex flex-col gap-8 lg:py-4">
            <h2 className="text-3xl font-extrabold text-text-main-light dark:text-white lg:text-4xl">
              {country.name.common}
            </h2>
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div className="flex flex-col gap-2">
                <Detail
                  title={'Native Name'}
                  content={
                    country.name.nativeName
                      ? country.name.nativeName[Object.keys(country.name.nativeName)[0]]?.common
                      : country.name.common
                  }
                />
                <Detail
                  title={'Population'}
                  content={country.population.toLocaleString('en-US')}
                />
                <Detail title={'Region'} content={country.region} />
                <Detail title={'Sub Region'} content={country.subregion} />
                <Detail title={'Capital'} content={country.capital?.[0] || 'N/A'} />
              </div>

              <div className="flex flex-col gap-2">
                <Detail title={'Top Level Domain'} content={country.tld ? country.tld[0] : 'N/A'} />
                <Detail
                  title={'Currencies'}
                  content={country.currencies ? Object.keys(country.currencies).map(
                    (key) => country.currencies[key].name
                  ) : ['N/A']}
                />
                <Detail
                  title={'Languages'}
                  content={country.languages ? Object.keys(country.languages).map(
                    (key) => country.languages[key]
                  ) : ['N/A']}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-text-main-light dark:text-white">
              Border countries:
            </h3>
            {country.borders && country.borders.length > 0 ? (
                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                 {country.borders.map((alphaCountry) => {
                   const borderCountryName = countries.getName(alphaCountry, 'en')

                   return (
                     borderCountryName && (
                       <BorderCountry
                         key={alphaCountry}
                         alpha={alphaCountry}
                         country={borderCountryName}
                         isGameMode={isGameMode}
                       />
                     )
                   )
                 })}
               </div>
            ) : (
                <p className="text-text-muted-light dark:text-text-muted-dark">No border countries (Island?)</p>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

function Detail({
  title,
  content,
}: {
  title: string
  content: string | number | string[]
}) {
  if (Array.isArray(content)) {
    return (
      <div className="text-base">
        <span className="font-semibold text-text-main-light dark:text-white">{title}:</span>
        <span className="ml-2 font-light text-text-muted-light dark:text-text-muted-dark">
          {content.join(', ')}
        </span>
      </div>
    )
  }

  return (
    <div className="text-base">
      <span className="font-semibold text-text-main-light dark:text-white">{title}:</span>
      <span className="ml-2 font-light text-text-muted-light dark:text-text-muted-dark">
        {content}
      </span>
    </div>
  )
}

function BorderCountry({ country, alpha, isGameMode }: { country: string; alpha: string, isGameMode: boolean }) {
  const basePath = isGameMode ? '/play' : '/browse'
  return (
    <Link
      to={`${basePath}/${alpha.toLowerCase()}`}
      className="flex items-center justify-center rounded-md bg-white py-2 px-4 text-center text-sm shadow-sm transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-md dark:bg-dark-element dark:text-white dark:hover:bg-gray-700"
    >
      {country}
    </Link>
  )
}

function CountryInformationSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-start gap-10 md:grid md:grid-cols-2 md:gap-16">
      {/* Flag */}
      <div className="h-64 w-full rounded-lg bg-gray-300 dark:bg-gray-700 lg:h-96" />

      {/* Info */}
      <div className="flex w-full flex-col gap-10 lg:py-10">
        {/* Name + 1st block */}
        <div className="mb-1 h-8 w-48 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-600" />
          </div>
          {/* 2nd Block */}
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-600" />
          </div>
        </div>
        {/* Border countries */}
        <div className="flex w-full flex-col gap-4">
          <div className="h-6 w-48 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="grid w-full grid-cols-3 gap-5">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-600" />
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
