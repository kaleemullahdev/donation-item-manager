import { useQuery } from '@tanstack/react-query'

import { addDonationItem } from '@/services/donation-item-services'

export const useQueryDonationItems = () => {
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ['donationItems'],
    queryFn: () => {},
  })

  return {
    isPending,
    error,
    data,
    isFetching,
    refetch,
  }
}
