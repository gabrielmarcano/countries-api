import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

function Root() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <div className="font-nunito min-h-screen bg-white">
        <div className="flex h-12 w-full items-center justify-between p-4 shadow-md">
          <h1 className="text-md font-bold text-gray-800">
            Where in the world?
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer"
            aria-label="Toggle dark mode"
            type="button"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            <span className="text-sm">{darkMode ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Root
