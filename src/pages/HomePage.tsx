import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CountryCard from '../components/CountryCard'
import { useEffect, useState } from 'react'

function HomePage() {
  const [inputValue, setInputValue] = useState('')
  const [search, setSearch] = useState('')

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
        <div className="w-full">
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
                className="ml-6 w-full text-xs text-gray-400 outline-none"
              />
            </div>
          </div>
          <div className="flex w-full justify-start">
            <button>Filter</button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
        </div>
      </div>
    </>
  )
}

export default HomePage
