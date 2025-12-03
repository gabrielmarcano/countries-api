import { Link } from 'react-router'
import type { CountriesResponse } from '../api/types'
import { memo } from 'react'

const CountryCard = memo(function CountryCard({
  data,
}: {
  data: CountriesResponse[0]
}) {
  return (
    <Link
        to={`/browse/${data.cca3.toLowerCase()}`}
        className="group flex w-full flex-col overflow-hidden rounded-lg bg-light-element shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-dark-element"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={data.flags.png}
          alt={data.name.common + ' flag'}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex w-full flex-col gap-4 p-6 text-text-main-light dark:text-white">
        <h2 className="text-xl font-extrabold">{data.name.common}</h2>
        <div className="flex flex-col gap-1">
            <Detail
            title="Population"
            content={data.population.toLocaleString('en-US')}
            />
            <Detail title="Region" content={data.region} />
            <Detail title="Capital" content={data.capital?.[0] || 'N/A'} />
        </div>
      </div>
    </Link>
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
    <div className="text-sm">
      <span className="font-semibold text-text-main-light dark:text-white">{title}:</span>
      <span className="ml-2 font-light text-text-muted-light dark:text-text-muted-dark">{content}</span>
    </div>
  )
}

export default CountryCard
