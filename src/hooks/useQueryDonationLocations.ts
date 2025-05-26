import { useQuery } from '@tanstack/react-query'

import { fetchLocations } from '@/services/donation-item-services'

export const useQueryDonationLocations = () => {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['donationLocations'],
    queryFn: fetchLocations,
  })

  return {
    isPending,
    error,
    data,
    isFetching,
    refetch,
  }
}
