import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faGamepad } from '@fortawesome/free-solid-svg-icons'

function WelcomePage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-4xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
            Explore the World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            Discover countries, learn geography, and have fun!
          </p>
        </div>

        <div className="grid w-full gap-8 md:grid-cols-2">
          <Link
            to="/browse"
            className="group flex flex-col items-center gap-6 rounded-2xl bg-white p-12 shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:bg-blue-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-800 dark:text-blue-300 dark:group-hover:bg-blue-700">
              <FontAwesomeIcon icon={faGlobe} size="3x" />
            </div>
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Browse Countries
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore all countries, search by name, and filter by region
              </p>
            </div>
          </Link>

          <Link
            to="/game"
            className="group flex flex-col items-center gap-6 rounded-2xl bg-white p-12 shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:bg-blue-900 dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white dark:bg-green-800 dark:text-green-300 dark:group-hover:bg-green-700">
              <FontAwesomeIcon icon={faGamepad} size="3x" />
            </div>
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Play a Game
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Test your geography skills by finding paths between countries
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
