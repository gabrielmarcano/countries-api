import { Link } from 'react-router'
import type { CountriesResponse } from '../api/types'

function CountryCard({ data }: { data: CountriesResponse[0] }) {
  return (
    <Link
      to={`/${data.name.common.toLowerCase()}`}
      className="mb-10 flex w-full cursor-pointer flex-col items-center justify-center rounded-sm bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
    >
      <div className="min-h-36 w-full rounded-t-sm bg-blue-200">
        <img
          src={data.flags.png}
          alt={data.name.common + ' flag'}
          className="h-full w-full rounded-t-sm object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-start p-6">
        <h2 className="mb-4 text-lg font-bold">{data.name.common}</h2>
        <Detail title="Population" content={data.population} />
        <Detail title="Region" content={data.region} />
        <Detail title="Capital" content={data.capital[0]} />
      </div>
    </Link>
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
