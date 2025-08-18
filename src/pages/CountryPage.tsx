import { Link, useParams } from 'react-router'
import { useCountry } from '../api/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import type { CountryResponse } from '../api/types'

import countries from 'i18n-iso-countries'

function CountryPage() {
  const { country } = useParams()
  const {
    data: countryData,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
  } = useCountry(country!, {
    enabled: !!country,
  })

  const theCountry = countryData?.data[0]

  return (
    <>
      <div className="flex w-full flex-col items-center p-6 py-12 lg:p-20 lg:py-16">
        <div className="mb-16 w-full">
          <Link
            to="/"
            className="flex w-30 items-center justify-center rounded-md py-2 shadow-[0_0px_20px_rgba(0,0,0,0.2)]"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-md mr-2" />
            <p>Back</p>
          </Link>
        </div>
        {theCountry && <CountryInformation data={theCountry} />}

        {isLoadingCountry && <CountryInformationSkeleton />}

        {isErrorCountry && <p className="text-red-500">Error</p>}
      </div>
    </>
  )
}

export default CountryPage

function CountryInformation({ data }: { data: CountryResponse[0] }) {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-12 md:flex-row">
        <img
          src={data.flags.png}
          alt={data.name.common + ' flag'}
          className="h-full w-full rounded-t-sm object-cover"
        />
        <div className="flex w-full flex-col gap-12 lg:gap-4">
          <div className="flex flex-col gap-8 lg:py-12">
            <h2 className="text-2xl font-extrabold lg:text-3xl">
              {data.name.common}
            </h2>
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div className="flex flex-col gap-1">
                <Detail
                  title={'Native Name'}
                  content={
                    data.name.nativeName[Object.keys(data.name.nativeName)[0]]
                      .common
                  }
                />
                <Detail
                  title={'Population'}
                  content={data.population.toLocaleString('en-US')}
                />
                <Detail title={'Region'} content={data.region} />
                <Detail title={'Sub Region'} content={data.subregion} />
                <Detail title={'Capital'} content={data.capital[0]} />
              </div>

              <div className="flex flex-col gap-1">
                <Detail title={'Top Level Domain'} content={data.tld} />
                <Detail
                  title={'Currencies'}
                  content={Object.keys(data.currencies).map(
                    (key) => data.currencies[key].name
                  )}
                />
                <Detail
                  title={'Languages'}
                  content={Object.keys(data.languages).map(
                    (key) => data.languages[key]
                  )}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex lg:w-full lg:gap-8">
            <h3 className="mb-4 text-lg font-medium lg:w-1/3">
              Border countries:
            </h3>
            <div className="grid w-full grid-cols-3 gap-5">
              {data.borders.map((border) => {
                const country = countries.getName(border, 'en')

                return (
                  country && <BorderCountry key={border} country={country} />
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
        <p className="inline text-black md:text-sm lg:text-lg">{title}:</p>
        <span className="ml-1 text-sm font-light md:text-xs lg:text-base">
          {content.join(', ')}
        </span>
      </div>
    )
  }

  return (
    <div>
      <p className="inline text-gray-950 md:text-sm lg:text-lg">{title}:</p>
      <span className="md:text-x ml-1 text-sm font-light lg:text-base">
        {content}
      </span>
    </div>
  )
}

function BorderCountry({ country }: { country: string }) {
  return (
    <Link
      to={`/${country.toLowerCase()}`}
      className="flex items-center justify-center rounded-md py-2 shadow-[0_0px_20px_rgba(0,0,0,0.1)]"
    >
      <p className="text-center">{country}</p>
    </Link>
  )
}

function CountryInformationSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-start gap-10 md:grid md:grid-cols-2 md:gap-16">
      {/* Flag */}
      <div className="h-64 w-full rounded-md bg-gray-300 lg:h-96" />

      {/* Info */}
      <div className="flex w-full flex-col gap-10 lg:py-10">
        {/* Name + 1st block */}
        <div className="mb-1 h-8 w-48 rounded bg-gray-300" />
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <div className="flex w-full flex-col">
            <div className="mb-2 h-4 w-40 rounded bg-gray-200 md:w-30 lg:w-40" />
            <div className="mb-2 h-4 w-32 rounded bg-gray-200 md:w-22 lg:w-32" />
            <div className="mb-2 h-4 w-36 rounded bg-gray-200 md:w-26 lg:w-36" />
            <div className="mb-2 h-4 w-28 rounded bg-gray-200 md:w-18 lg:w-28" />
          </div>
          {/* 2nd Block */}
          <div className="flex w-full flex-col">
            <div className="mb-2 h-4 w-28 rounded bg-gray-200 md:w-18 lg:w-28" />
            <div className="mb-2 h-4 w-40 rounded bg-gray-200 md:w-30 lg:w-40" />
            <div className="mb-2 h-4 w-36 rounded bg-gray-200 md:w-26 lg:w-36" />
          </div>
        </div>
        {/* Border countries */}
        <div className="flex w-full flex-col lg:w-full lg:flex-row lg:gap-5">
          <div className="mb-6 h-6 w-48 rounded bg-gray-300" />
          <div className="grid w-full grid-cols-3 gap-5">
            <div className="h-10 rounded bg-gray-200" />
            <div className="h-10 rounded bg-gray-200" />
            <div className="h-10 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
