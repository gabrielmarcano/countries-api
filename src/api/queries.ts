import { useQuery } from '@tanstack/react-query'
import { getCountries, getCountry } from './api'

export const useCountries = (config?: object) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
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
