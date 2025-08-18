import axios from 'axios'
import type { CountriesResponse, AlphaResponse } from './types'

export const getAllCountries = () =>
  axios.get<CountriesResponse>(
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3'
  )

export const getCountriesByRegion = (region: string) =>
  axios.get<CountriesResponse>(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital,cca3`
  )

export const getCountry = (country: string) =>
  axios.get<CountriesResponse>(
    `https://restcountries.com/v3.1/name/${country}?fields=name,flags,population,region,capital,cca3`
  )

export const getAlpha = (countryCode: string) =>
  axios.get<AlphaResponse>(
    `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
  )
