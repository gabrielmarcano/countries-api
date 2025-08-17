import axios from 'axios'
import type { CountriesResponse, CountryResponse } from './types'

export const getCountries = () =>
  axios.get<CountriesResponse>(
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
  )

export const getCountry = (name: string) =>
  axios.get<CountryResponse>(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,region,capital`
  )
