import { API_BASE } from '@/constants'
import {
  CreateDonationItemRequest,
  DonationItem,
  Location,
  Theme,
} from '@/types'

export const fetchStatuses = async (): Promise<DonationItem[]> => {
  const response = await fetch(`${API_BASE}/statuses`, {
    method: 'GET',
  })
  if (!response.ok) throw new Error('Failed to fetch donation items')
  return response.json()
}

export const fetchDonationItems = async (): Promise<DonationItem[]> => {
  const response = await fetch(`${API_BASE}/all`, {
    method: 'GET',
  })
  if (!response.ok) throw new Error('Failed to fetch donation items')
  return response.json()
}

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await fetch(`${API_BASE}/locations`)
  if (!response.ok) throw new Error('Failed to fetch locations')
  return response.json()
}

export const fetchThemes = async (): Promise<Theme[]> => {
  const response = await fetch(`${API_BASE}/themes`)
  if (!response.ok) throw new Error('Failed to fetch themes')
  return response.json()
}

export const addDonationItem = async (
  data: CreateDonationItemRequest
): Promise<DonationItem> => {
  const response = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Failed to create donation item')
  }

  return response.json()
}

export const resetDonationData = async (): Promise<DonationItem> => {
  const response = await fetch(`${API_BASE}/reset`, {
    method: 'POST',

    headers: {
      accept: '*/*',
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Failed to create donation item')
  }

  return response.json()
}
