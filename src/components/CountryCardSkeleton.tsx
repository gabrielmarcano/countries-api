function CountryCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-light-element shadow-md dark:bg-dark-element">
      <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex w-full flex-col gap-4 p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-col gap-2">
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  )
}

export default CountryCardSkeleton
