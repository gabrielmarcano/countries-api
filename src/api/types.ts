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
  cca3: string
}

export type AlphaResponse = Country & {
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
  borders: string[] | []
}

export type CountriesResponse = Country[]
