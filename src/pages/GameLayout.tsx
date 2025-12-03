import { Outlet, Navigate, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { useAllCountries } from '../api/queries'
import { AlphaResponse } from '../api/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'

function GameLayout() {
  const { data: allCountries, isLoading, isError } = useAllCountries()
  const [targetCountry, setTargetCountry] = useState<AlphaResponse | null>(null)
  const [startCountry, setStartCountry] = useState<AlphaResponse | null>(null)
  const [isGameInitialized, setIsGameInitialized] = useState(false)
  const location = useLocation()

  // Reset game state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initializeGame = () => {
    if (!allCountries?.data) return

    const countries = allCountries.data
    // 1. Pick a random region that has enough countries
    const regions = ['Africa', 'Americas', 'Asia', 'Europe'] // Oceania sometimes is tricky with borders
    const randomRegion = regions[Math.floor(Math.random() * regions.length)]

    // 2. Filter countries by that region
    const regionCountries = countries.filter(c => c.region.includes(randomRegion) || c.region === randomRegion)

    if (regionCountries.length < 2) {
      // Fallback if region is too small (unlikely for main regions)
      initializeGame()
      return
    }

    // 3. Pick Start and Target
    const start = regionCountries[Math.floor(Math.random() * regionCountries.length)]
    let target = regionCountries[Math.floor(Math.random() * regionCountries.length)]

    // Ensure they are different
    while (target.cca3 === start.cca3) {
      target = regionCountries[Math.floor(Math.random() * regionCountries.length)]
    }

    setStartCountry(start)
    setTargetCountry(target)
    setIsGameInitialized(true)
  }

  useEffect(() => {
    if (!isLoading && allCountries && !isGameInitialized) {
      initializeGame()
    }
  }, [allCountries, isLoading, isGameInitialized, initializeGame])

  if (isLoading) return <div className="p-12 text-center">Loading Game...</div>
  if (isError) return <div className="p-12 text-center text-red-500">Error loading countries</div>

  if (!isGameInitialized || !startCountry || !targetCountry) {
    return <div className="p-12 text-center">Preparing your journey...</div>
  }

  // If we are at /play, redirect to start country
  if (location.pathname === '/play' || location.pathname === '/play/') {
    return <Navigate to={`/play/${startCountry.cca3.toLowerCase()}`} replace />
  }

  return (
    <div className="flex flex-col">
       {/* Game Header */}
       <div className="sticky top-0 z-10 w-full bg-white/95 px-6 py-4 shadow-md backdrop-blur-sm dark:bg-gray-900/95 md:px-12 xl:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Target Destination</span>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFlagCheckered} className="text-green-600" />
                        <span className="text-xl font-extrabold text-gray-900 dark:text-white">{targetCountry.name.common}</span>
                        <img src={targetCountry.flags.png} alt="Target Flag" className="h-4 w-6 rounded-sm object-cover" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                 <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-red-500">
                    Quit Game
                 </Link>
            </div>
        </div>
       </div>

      <Outlet context={{ targetCountry, startCountry }} />
    </div>
  )
}

export default GameLayout
