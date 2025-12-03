import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import CountryCard from '../components/CountryCard'
import { useMemo, useState } from 'react'
import {
  useAllCountries,
  useCountriesByRegion,
  useCountry,
} from '../api/queries'
import CountryCardSkeleton from '../components/CountryCardSkeleton'
import { useDebounce } from '../hooks/useDebounce'

function HomePage() {
  const [inputValue, setInputValue] = useState('')
  const debouncedSearch = useDebounce(inputValue, 500)

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

  const {
    data: country,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
  } = useCountry(debouncedSearch, {
    enabled: !!debouncedSearch,
  })

  const isLoadingAll = useMemo(
    () => isLoading || isLoadingByRegion || isLoadingCountry,
    [isLoading, isLoadingByRegion, isLoadingCountry]
  )
  const isErrorAll = useMemo(
    () => isError || isErrorByRegion || isErrorCountry,
    [isError, isErrorByRegion, isErrorCountry]
  )

  const countries = useMemo(() => {
    if (country) return country
    if (selectedRegion === 'All') return allCountries
    return countriesByRegion
  }, [selectedRegion, allCountries, countriesByRegion, country])

  return (
    <>
      <div className="flex flex-col items-center p-6 md:p-12 xl:px-20">
        <div className="mb-10 w-full md:mb-16 md:flex md:justify-between">
          <div className="mb-12 flex w-full md:mb-0 md:w-1/2 lg:w-1/3">
            <div className="flex w-full items-center rounded-lg bg-light-element px-8 py-4 shadow-md transition-shadow focus-within:shadow-lg dark:bg-dark-element">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-400 dark:text-gray-200"
              />
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                placeholder="Search for a country..."
                className="ml-6 w-full bg-transparent text-sm text-text-main-light outline-none dark:text-white dark:placeholder-gray-200"
              />
            </div>
          </div>
          {!country && (
            <Filter
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-15 px-6 md:grid md:grid-cols-2 md:gap-16 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
          {countries &&
            countries.data?.map((country) => (
              <CountryCard key={country.name.common} data={country} />
            ))}

          {isLoadingAll && (
            <>
              {[...Array(isLoadingCountry ? 1 : 8)].map((_, i) => (
                <CountryCardSkeleton key={i} />
              ))}
            </>
          )}

          {isErrorAll && <p className="text-red-500 font-bold">Error loading content. Please try again later.</p>}
        </div>
      </div>
    </>
  )
}

function Filter({
  selectedRegion,
  setSelectedRegion,
  isOpen,
  setIsOpen,
}: {
  selectedRegion: string
  setSelectedRegion: (region: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-48 cursor-pointer items-center justify-between rounded-lg bg-light-element p-4 text-sm text-text-main-light shadow-md transition-all hover:bg-gray-50 dark:bg-dark-element dark:text-white dark:hover:bg-gray-700"
      >
        <p className="pl-2 font-semibold">
          {selectedRegion === 'All' ? 'Filter by Region' : selectedRegion}
        </p>
        <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 flex w-full flex-col rounded-lg bg-light-element py-2 shadow-lg dark:bg-dark-element">
          {['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'].map(
            (region) => (
              <RegionOption
                key={region}
                region={region}
                onClick={() => {
                  setSelectedRegion(region)
                  setIsOpen(false)
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

function RegionOption({
  region,
  onClick,
}: {
  region: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer px-6 py-2 text-left text-sm text-text-main-light transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    >
      {region}
    </button>
  )
}

export default HomePage
