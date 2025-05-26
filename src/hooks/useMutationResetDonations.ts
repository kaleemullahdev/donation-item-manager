import { useMutation } from '@tanstack/react-query'

import { resetDonationData } from '@/services/donation-item-services'
import { DonationMutationHookProps } from '@/types'

export const useMutationResetDonations = ({
  onSuccess,
  onSettled,
}: DonationMutationHookProps) => {
  const {
    isPending,
    mutate: resetDonations,
    error,
    data,
  } = useMutation({
    mutationKey: ['ressetDonationData'],
    mutationFn: resetDonationData,
    onSettled: onSettled,
    onSuccess: onSuccess,
  })

  return {
    isPending,
    error,
    data,
    resetDonations,
  }
}
