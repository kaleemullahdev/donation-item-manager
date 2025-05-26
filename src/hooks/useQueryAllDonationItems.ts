import { useQuery } from '@tanstack/react-query'

import { fetchDonationItems } from '@/services/donation-item-services'

export const useQueryAllDonationItems = () => {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['donationItems'],
    queryFn: fetchDonationItems,
  })

  return {
    isPending,
    error,
    data,
    isFetching,
    refetch,
  }
}
