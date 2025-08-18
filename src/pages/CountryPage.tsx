import { useParams } from 'react-router'
import { useCountry } from '../api/queries'

function CountryPage() {
  const { country } = useParams()
  const { data: countryData } = useCountry(country!, {
    enabled: !!country,
  })

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto w-full p-4">
          <h1 className="text-3xl font-bold text-gray-800">CountryPage</h1>
          <p>CountryPage</p>
          <p>Info</p>
          <p>Currencies</p>
          <p>{countryData?.data[0].name.common}</p>
        </div>
      </div>
    </>
  )
}

export default CountryPage
