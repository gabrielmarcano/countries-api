import CountryCard from '../components/CountryCard'

function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto w-full p-4">
          <input
            type="text"
            placeholder="Search for a country..."
            className="mb-4 w-full rounded border border-gray-300 px-4 py-2 text-gray-800"
          />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
        </div>
      </div>
    </>
  )
}

export default HomePage
