export interface Price {
  amount: number
  currencyCode: string
  text: string
}

export interface Location {
  id: string
  name: string
}

export interface Theme {
  id: string
  name: string
}

export interface DonationItem {
  id: string
  name: string
  reference?: { type: { id: string } }
  price?: Price
  status: { id: string; name: string }
  location?: Location
  theme?: Theme
}

export interface CreateDonationItemRequest {
  name: string
  location: string
  theme: string
  price?: Omit<Price, 'text'>
}

export interface FormData {
  name: string
  locationId: string
  themeId: string
  price: string
}

export interface FormErrors {
  name?: string
  locationId?: string
  themeId?: string
  price?: string
}

export type DonationMutationHookProps = {
  onSuccess: (
    data: DonationItem | undefined,
    variables: CreateDonationItemRequest | undefined,
    context: unknown
  ) => Promise<unknown> | unknown

  onError: (
    error: Error,
    variables: CreateDonationItemRequest,
    context: unknown
  ) => Promise<unknown> | unknown
  onSettled: (
    data: DonationItem | undefined,
    error: Error | null,
    context: unknown
  ) => Promise<unknown> | unknown
}
