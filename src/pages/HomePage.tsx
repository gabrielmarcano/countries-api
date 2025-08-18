import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import CountryCard from '../components/CountryCard'
import { useEffect, useMemo, useState } from 'react'
import { useAllCountries, useCountriesByRegion } from '../api/queries'
import CountryCardSkeleton from '../components/CountryCardSkeleton'

function HomePage() {
  const [inputValue, setInputValue] = useState('')
  const [search, setSearch] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('All')

  const {
    data: allCountries,
    isLoading,
    isError,
  } = useAllCountries({
    enabled: selectedRegion === 'All',
  })

  const {
    data: countriesByRegion,
    isLoading: isLoadingByRegion,
    isError: isErrorByRegion,
  } = useCountriesByRegion(selectedRegion.toLowerCase(), {
    enabled: selectedRegion !== 'All',
  })

  const countries = useMemo(() => {
    if (selectedRegion === 'All') {
      return allCountries
    } else {
      return countriesByRegion
    }
  }, [selectedRegion, allCountries, countriesByRegion])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <div className="mb-10 w-full">
          <div className="mb-12 flex w-full">
            <div className="flex w-full items-center rounded-md px-8 py-4 shadow-[0_0px_20px_rgba(0,0,0,0.1)]">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-400"
              />
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                placeholder="Search for a country..."
                className="ml-6 w-full text-sm text-gray-400 outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex w-50 cursor-pointer items-center justify-between rounded-md p-4 text-sm shadow-[0_0px_20px_rgba(0,0,0,0.1)]"
          >
            <p className="pl-4">
              {selectedRegion === 'All' ? 'Filter by Region' : selectedRegion}
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            <div
              className={` ${isOpen ? 'flex' : 'hidden'} absolute bottom-0 left-0 w-full translate-y-51/50 cursor-pointer flex-col rounded-md bg-white text-sm shadow-[0_0px_20px_rgba(0,0,0,0.1)]`}
            >
              {['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'].map(
                (region) => (
                  <RegionOption
                    key={region}
                    region={region}
                    onClick={() => {
                      setSelectedRegion(region)
                      setIsOpen(false)
                    }}
                    top={region === 'All'}
                    bottom={region === 'Oceania'}
                  />
                )
              )}
            </div>
          </button>
        </div>
        <div className="flex w-full flex-col items-center justify-center px-6">
          {countries &&
            countries.data?.map((country) => (
              <CountryCard key={country.name.common} data={country} />
            ))}

          {(isLoading || isLoadingByRegion) && (
            <>
              {[...Array(6)].map((_, i) => (
                <CountryCardSkeleton key={i} />
              ))}
            </>
          )}

          {(isError || isErrorByRegion) && (
            <p className="text-red-500">Error</p>
          )}
        </div>
      </div>
    </>
  )
}

function RegionOption({
  region,
  onClick,
  top,
  bottom,
}: {
  region: string
  onClick: () => void
  top?: boolean
  bottom?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer py-2 pl-6 text-left hover:bg-gray-50 ${top && 'rounded-t-md pt-4'} ${bottom && 'rounded-b-md pb-4'}`}
    >
      {region}
    </button>
  )
}

export default HomePage
