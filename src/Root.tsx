import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

function Root() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <>
      <div className="font-nunito min-h-screen w-full bg-gray-50 transition-colors duration-200 dark:bg-blue-950">
        <header className="flex h-24 w-full items-center justify-between bg-white p-4 shadow-md transition-colors duration-200 dark:bg-blue-900 md:px-12 xl:px-20">
          <h1 className="text-md font-bold text-gray-800 dark:text-white">
            Where in the world?
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex cursor-pointer items-center gap-2 text-gray-800 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            aria-label="Toggle dark mode"
            type="button"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            <span className="text-sm font-semibold">
              {darkMode ? 'Light' : 'Dark'} Mode
            </span>
          </button>
        </header>
        <Outlet />
      </div>
    </>
  )
}

export default Root
