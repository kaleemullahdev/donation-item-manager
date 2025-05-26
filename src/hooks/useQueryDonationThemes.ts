import { useQuery } from '@tanstack/react-query'

import { fetchThemes } from '@/services/donation-item-services'

export const useQueryDonationThemes = () => {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['donationThemes'],
    queryFn: fetchThemes,
  })

  return {
    isPending,
    error,
    data,
    isFetching,
    refetch,
  }
}
