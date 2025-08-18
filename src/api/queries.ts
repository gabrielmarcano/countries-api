import { useQuery } from '@tanstack/react-query'
import {
  getAllCountries,
  getAlpha,
  getCountriesByRegion,
  getCountry,
} from './api'

export const useAllCountries = (config?: object) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
    ...config,
  })
}

export const useCountriesByRegion = (region: string, config?: object) => {
  return useQuery({
    queryKey: ['countriesByRegion', region],
    queryFn: () => getCountriesByRegion(region),
    ...config,
  })
}

export const useCountry = (country: string, config?: object) => {
  return useQuery({
    queryKey: ['country', country],
    queryFn: () => getCountry(country),
    ...config,
  })
}

export const useAlpha = (countryCode: string, config?: object) => {
  return useQuery({
    queryKey: ['alpha', countryCode],
    queryFn: () => getAlpha(countryCode),
    ...config,
  })
}
