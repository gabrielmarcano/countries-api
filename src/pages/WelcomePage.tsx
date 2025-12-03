import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faDice } from '@fortawesome/free-solid-svg-icons'

function WelcomePage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-12 p-6 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white md:text-6xl">
          Explore the World
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Discover countries, borders, and cultures.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        <Link
          to="/browse"
          className="group flex w-64 flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <FontAwesomeIcon icon={faGlobe} size="2x" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Browse Freely
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Navigate the map without limits.
            </p>
          </div>
        </Link>

        <Link
          to="/play"
          className="group flex w-64 flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
            <FontAwesomeIcon icon={faDice} size="2x" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              I'm Feeling Lucky
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Test your geography skills!
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage
