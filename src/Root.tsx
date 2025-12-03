import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

function Root() {
  // Initialize from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) {
            return saved === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-light-bg transition-colors duration-300 dark:bg-dark-bg">
        <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-light-element px-6 shadow-md transition-colors duration-300 dark:bg-dark-element md:px-12 xl:px-20">
          <h1 className="text-lg font-extrabold text-text-main-light dark:text-white md:text-2xl">
            Where in the world?
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            type="button"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-text-main-light dark:text-white group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-text-main-light dark:text-white">{darkMode ? 'Light' : 'Dark'} Mode</span>
          </button>
        </header>
        <main className="flex-1">
             <Outlet />
        </main>
      </div>
    </>
  )
}

export default Root
