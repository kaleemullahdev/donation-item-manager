import { useMutation } from '@tanstack/react-query'

import { addDonationItem } from '@/services/donation-item-services'
import { DonationMutationHookProps } from '@/types'

export const useMutationAddDonationItems = ({
  onSuccess,
  onError,
}: DonationMutationHookProps) => {
  const {
    isPending,
    mutate: addDonationItemMutation,
    error,
    data,
  } = useMutation({
    mutationKey: ['addDonationItems'],
    mutationFn: addDonationItem,
    onSuccess: onSuccess,
    onError: onError,
  })

  return {
    isPending,
    error,
    data,
    addDonationItemMutation,
  }
}
