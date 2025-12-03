import { Link, useParams } from 'react-router'
import { useAlpha } from '../api/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import type { AlphaResponse } from '../api/types'

import countries from 'i18n-iso-countries'

function CountryPage() {
  const { countryCode } = useParams()

  const {
    data: countryData,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
  } = useAlpha(countryCode!, {
    enabled: !!countryCode,
  })

  const theCountry = countryData?.data

  return (
    <>
      <div className="flex w-full flex-col items-center p-6 py-12 lg:p-20 lg:py-16">
        <div className="mb-16 w-full">
          <Link
            to="/browse"
            className="flex w-30 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 shadow-[0_0px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0px_25px_rgba(0,0,0,0.15)] dark:bg-blue-900 dark:text-white dark:shadow-[0_0px_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0px_25px_rgba(0,0,0,0.4)]"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-md" />
            <p>Back</p>
          </Link>
        </div>
        {theCountry && <CountryInformation country={theCountry} />}

        {isLoadingCountry && <CountryInformationSkeleton />}

        {isErrorCountry && (
          <p className="text-red-500 dark:text-red-400">
            Error loading country
          </p>
        )}
      </div>
    </>
  )
}

export default CountryPage

function CountryInformation({ country }: { country: AlphaResponse }) {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-12 md:flex-row">
        <img
          src={country.flags.png}
          alt={country.name.common + ' flag'}
          className="h-full w-full rounded-lg object-cover shadow-xl"
        />
        <div className="flex w-full flex-col gap-12 lg:gap-4">
          <div className="flex flex-col gap-8 lg:py-12">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white lg:text-3xl">
              {country.name.common}
            </h2>
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div className="flex flex-col gap-1">
                <Detail
                  title={'Native Name'}
                  content={
                    country.name.nativeName[
                      Object.keys(country.name.nativeName)[0]
                    ].common
                  }
                />
                <Detail
                  title={'Population'}
                  content={country.population.toLocaleString('en-US')}
                />
                <Detail title={'Region'} content={country.region} />
                <Detail title={'Sub Region'} content={country.subregion} />
                <Detail title={'Capital'} content={country.capital[0]} />
              </div>

              <div className="flex flex-col gap-1">
                <Detail title={'Top Level Domain'} content={country.tld} />
                <Detail
                  title={'Currencies'}
                  content={Object.keys(country.currencies).map(
                    (key) => country.currencies[key].name
                  )}
                />
                <Detail
                  title={'Languages'}
                  content={Object.keys(country.languages).map(
                    (key) => country.languages[key]
                  )}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex lg:w-full lg:gap-8">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white lg:w-1/3">
              Border countries:
            </h3>
            <div className="grid w-full grid-cols-3 gap-5">
              {country.borders.map((alphaCountry) => {
                const country = countries.getName(alphaCountry, 'en')

                return (
                  country && (
                    <BorderCountry
                      key={alphaCountry}
                      alpha={alphaCountry}
                      country={country}
                    />
                  )
                )
              })}
            </div>
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
      <div>
        <p className="inline text-gray-900 dark:text-white md:text-sm lg:text-lg">
          {title}:
        </p>
        <span className="ml-1 text-sm font-light text-gray-700 dark:text-gray-300 md:text-xs lg:text-base">
          {content.join(', ')}
        </span>
      </div>
    )
  }

  return (
    <div>
      <p className="inline text-gray-900 dark:text-white md:text-sm lg:text-lg">
        {title}:
      </p>
      <span className="ml-1 text-sm font-light text-gray-700 dark:text-gray-300 md:text-xs lg:text-base">
        {content}
      </span>
    </div>
  )
}

function BorderCountry({ country, alpha }: { country: string; alpha: string }) {
  return (
    <Link
      to={`/${alpha.toLowerCase()}`}
      className="flex items-center justify-center rounded-lg bg-white py-2 shadow-[0_0px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0px_25px_rgba(0,0,0,0.15)] dark:bg-blue-900 dark:text-white dark:shadow-[0_0px_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0px_25px_rgba(0,0,0,0.4)]"
    >
      <p className="text-center">{country}</p>
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
          <div className="flex w-full flex-col">
            <div className="mb-2 h-4 w-40 rounded bg-gray-200 dark:bg-gray-700 md:w-30 lg:w-40" />
            <div className="mb-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 md:w-22 lg:w-32" />
            <div className="mb-2 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700 md:w-26 lg:w-36" />
            <div className="mb-2 h-4 w-28 rounded bg-gray-200 dark:bg-gray-700 md:w-18 lg:w-28" />
          </div>
          {/* 2nd Block */}
          <div className="flex w-full flex-col">
            <div className="mb-2 h-4 w-28 rounded bg-gray-200 dark:bg-gray-700 md:w-18 lg:w-28" />
            <div className="mb-2 h-4 w-40 rounded bg-gray-200 dark:bg-gray-700 md:w-30 lg:w-40" />
            <div className="mb-2 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700 md:w-26 lg:w-36" />
          </div>
        </div>
        {/* Border countries */}
        <div className="flex w-full flex-col lg:w-full lg:flex-row lg:gap-5">
          <div className="mb-6 h-6 w-48 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="grid w-full grid-cols-3 gap-5">
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  )
}
