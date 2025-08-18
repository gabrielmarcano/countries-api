import { Link } from 'react-router'
import type { CountriesResponse } from '../api/types'

function CountryCard({ data }: { data: CountriesResponse[0] }) {
  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center rounded-sm bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
      <Link
        to={`/${data.name.common.toLowerCase()}`}
        className="aspect-4/3 w-full cursor-pointer rounded-t-sm bg-gray-200"
      >
        <img
          src={data.flags.png}
          alt={data.name.common + ' flag'}
          className="h-full w-full rounded-t-sm object-cover"
        />
      </Link>
      <div className="flex w-full flex-col items-start p-6">
        <h2 className="mb-4 text-lg font-bold">{data.name.common}</h2>
        <Detail
          title="Population"
          content={data.population.toLocaleString('en-US')}
        />
        <Detail title="Region" content={data.region} />
        <Detail title="Capital" content={data.capital[0]} />
      </div>
    </div>
  )
}

function Detail({
  title,
  content,
}: {
  title: string
  content: string | number
}) {
  return (
    <div>
      <p className="inline text-gray-950">{title}:</p>
      <span className="ml-1 text-sm font-light">{content}</span>
    </div>
  )
}

export default CountryCard
