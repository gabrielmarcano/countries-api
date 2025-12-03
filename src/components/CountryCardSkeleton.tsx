function CountryCardSkeleton() {
  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] dark:bg-blue-900 dark:shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
      <div className="aspect-3/2 w-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex w-full flex-col p-6">
        <div className="mb-6 h-5 w-1/2 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mb-4 h-3 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mb-4 h-3 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="mb-4 h-3 w-1/3 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}

export default CountryCardSkeleton
