import { useState } from 'react'
import { Link } from 'react-router'
import { useAllCountries, useAlpha } from '../api/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faTrophy,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import countries from 'i18n-iso-countries'

function GamePage() {
  const { data: allCountries } = useAllCountries()

  const [gameState, setGameState] = useState<{
    currentCountry: string
    targetCountry: string
    path: string[]
    moves: number
    gameStarted: boolean
    gameWon: boolean
  }>({
    currentCountry: '',
    targetCountry: '',
    path: [],
    moves: 0,
    gameStarted: false,
    gameWon: false,
  })

  const {
    data: currentCountryData,
    isLoading: isLoadingCurrent,
    isError: isErrorCurrent,
  } = useAlpha(gameState.currentCountry, {
    enabled: !!gameState.currentCountry,
  })

  const { data: targetCountryData } = useAlpha(gameState.targetCountry, {
    enabled: !!gameState.targetCountry,
  })

  const startGame = () => {
    if (!allCountries?.data) return

    // Filter countries that have borders
    const countriesWithBorders = allCountries.data.filter(
      (country) => country.cca3
    )

    // Pick two random countries
    const randomIndex1 = Math.floor(
      Math.random() * countriesWithBorders.length
    )
    let randomIndex2 = Math.floor(Math.random() * countriesWithBorders.length)

    // Ensure they're different
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * countriesWithBorders.length)
    }

    const startCountry = countriesWithBorders[randomIndex1].cca3.toLowerCase()
    const endCountry = countriesWithBorders[randomIndex2].cca3.toLowerCase()

    setGameState({
      currentCountry: startCountry,
      targetCountry: endCountry,
      path: [startCountry],
      moves: 0,
      gameStarted: true,
      gameWon: false,
    })
  }

  const moveToCountry = (countryCode: string) => {
    const lowerCode = countryCode.toLowerCase()
    setGameState((prev) => ({
      ...prev,
      currentCountry: lowerCode,
      path: [...prev.path, lowerCode],
      moves: prev.moves + 1,
      gameWon: lowerCode === prev.targetCountry,
    }))
  }

  const resetGame = () => {
    setGameState({
      currentCountry: '',
      targetCountry: '',
      path: [],
      moves: 0,
      gameStarted: false,
      gameWon: false,
    })
  }

  if (!gameState.gameStarted) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center p-6">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
              Geography Challenge
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Navigate from one country to another by traveling through
              neighboring countries!
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:bg-blue-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              How to Play:
            </h3>
            <ul className="mb-8 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>You'll be given a starting country and a target country</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🗺️</span>
                <span>
                  Click on border countries to move between neighboring nations
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏆</span>
                <span>Reach your target country to win!</span>
              </li>
            </ul>

            <button
              onClick={startGame}
              disabled={!allCountries?.data}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 dark:from-blue-700 dark:to-blue-800"
            >
              {allCountries?.data ? 'Start Game' : 'Loading...'}
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    )
  }

  if (gameState.gameWon) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center p-6">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-2xl">
              <FontAwesomeIcon icon={faTrophy} size="4x" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
              Congratulations! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              You reached{' '}
              <span className="font-bold">
                {targetCountryData?.data.name.common}
              </span>{' '}
              in{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {gameState.moves}
              </span>{' '}
              {gameState.moves === 1 ? 'move' : 'moves'}!
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:bg-blue-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Your Path:
            </h3>
            <div className="flex flex-wrap gap-2">
              {gameState.path.map((code, index) => {
                const countryName = countries.getName(code.toUpperCase(), 'en')
                return (
                  <span
                    key={code}
                    className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                  >
                    {index > 0 && '→ '}
                    {countryName}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl dark:from-blue-700 dark:to-blue-800"
            >
              Play Again
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-3 font-bold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-blue-800"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center p-6 py-12 lg:p-20 lg:py-16">
      {/* Game Header */}
      <div className="mb-8 w-full">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Home</span>
          </Link>
          <button
            onClick={resetGame}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            New Game
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-blue-900">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>CURRENT LOCATION</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentCountryData?.data.name.common}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Moves: {gameState.moves}
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 shadow-lg">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-100">
              <FontAwesomeIcon icon={faTrophy} />
              <span>TARGET DESTINATION</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {targetCountryData?.data.name.common}
            </p>
          </div>
        </div>
      </div>

      {/* Current Country Details */}
      {isLoadingCurrent && (
        <div className="w-full text-center">
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      )}

      {isErrorCurrent && (
        <div className="w-full text-center">
          <p className="text-red-500">Error loading country data</p>
        </div>
      )}

      {currentCountryData?.data && (
        <div className="flex w-full flex-col items-start gap-12 md:flex-row">
          <img
            src={currentCountryData.data.flags.png}
            alt={currentCountryData.data.name.common + ' flag'}
            className="h-full w-full rounded-lg object-cover shadow-xl md:w-1/2"
          />
          <div className="flex w-full flex-col gap-8">
            <div>
              <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                Choose a Neighboring Country
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select one of the border countries to continue your journey
              </p>
            </div>

            {currentCountryData.data.borders &&
            currentCountryData.data.borders.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {currentCountryData.data.borders.map((alphaCountry) => {
                  const countryName = countries.getName(alphaCountry, 'en')
                  const isTarget =
                    alphaCountry.toLowerCase() === gameState.targetCountry

                  return (
                    countryName && (
                      <button
                        key={alphaCountry}
                        onClick={() => moveToCountry(alphaCountry)}
                        className={`rounded-lg p-4 text-left font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                          isTarget
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                            : 'bg-white text-gray-900 hover:bg-gray-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800'
                        }`}
                      >
                        {countryName}
                        {isTarget && (
                          <span className="ml-2 text-xs">🎯 TARGET</span>
                        )}
                      </button>
                    )
                  )
                })}
              </div>
            ) : (
              <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                <p className="text-yellow-800 dark:text-yellow-200">
                  This country has no borders! You might want to start a new
                  game.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage
