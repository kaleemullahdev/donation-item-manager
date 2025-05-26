import { useQuery } from '@tanstack/react-query'

import { fetchStatuses } from '@/services/donation-item-services'

export const useQueryDonationStatuses = () => {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['donationStatuses'],
    queryFn: fetchStatuses,
  })

  return {
    isPending,
    error,
    data,
    isFetching,
    refetch,
  }
}
