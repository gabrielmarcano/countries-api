function CountryCardSkeleton() {
  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center rounded-sm bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
      <div className="aspect-3/2 w-full rounded-t-sm bg-gray-200"></div>
      <div className="flex w-full flex-col p-6">
        <div className="mb-6 h-5 w-1/2 animate-pulse rounded bg-gray-300"></div>
        <div className="mb-4 h-3 w-2/3 animate-pulse rounded bg-gray-300"></div>
        <div className="mb-4 h-3 w-2/3 animate-pulse rounded bg-gray-300"></div>
        <div className="mb-4 h-3 w-1/3 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  )
}

export default CountryCardSkeleton
