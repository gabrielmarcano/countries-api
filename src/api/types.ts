type Country = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  capital: string[]
  region: string
  population: number
}

type ExtendedCountry = Country & {
  tld: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  subregion: string
  languages: {
    [key: string]: string
  }
  borders: string[]
}

export type CountryResponse = ExtendedCountry[]

export type CountriesResponse = Country[]
