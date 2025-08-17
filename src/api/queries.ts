import { useQuery } from '@tanstack/react-query'
import { getAllCountries, getCountry } from './api'

export const useAllCountries = (config?: object) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
    ...config,
  })
}

export const useCountriesByRegion = (region: string, config?: object) => {
  return useQuery({
    queryKey: ['countries', region],
    queryFn: getAllCountries,
    ...config,
  })
}

export const useCountry = (name: string, config?: object) => {
  return useQuery({
    queryKey: ['country', name],
    queryFn: () => getCountry(name),
    ...config,
  })
}
