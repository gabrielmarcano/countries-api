import { Link } from 'react-router'
import type { CountriesResponse } from '../api/types'
import { memo } from 'react'

const CountryCard = memo(function CountryCard({
  data,
}: {
  data: CountriesResponse[0]
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:bg-blue-900 dark:shadow-[0_5px_15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <Link
        to={`/${data.cca3.toLowerCase()}`}
        className="aspect-3/2 w-full cursor-pointer bg-gray-200"
      >
        <img
          src={data.flags.png}
          alt={data.name.common + ' flag'}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex w-full flex-col items-start p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          {data.name.common}
        </h2>
        <Detail
          title="Population"
          content={data.population.toLocaleString('en-US')}
        />
        <Detail title="Region" content={data.region} />
        <Detail title="Capital" content={data.capital[0]} />
      </div>
    </div>
  )
})

function Detail({
  title,
  content,
}: {
  title: string
  content: string | number
}) {
  return (
    <div>
      <p className="inline text-gray-950 dark:text-white">{title}:</p>
      <span className="ml-1 text-sm font-light text-gray-700 dark:text-gray-300">
        {content}
      </span>
    </div>
  )
}

export default CountryCard
