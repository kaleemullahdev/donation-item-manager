import { render, screen } from '@testing-library/react'

import { DonationItem } from '@/types'

import { DataCard } from '../data-card'

const mockPaginatedItems: DonationItem[] = [
  {
    id: '1',
    name: 'Item 1',
    status: { id: 'active', name: 'Active' },
    reference: { type: { id: 'ref1' } },
    price: { amount: 10, currencyCode: 'GBP', text: '£10' },
    location: { id: 'loc1', name: 'Location 1' },
    theme: { id: 'theme1', name: 'Theme 1' },
  },
  {
    id: '2',
    name: 'Item 2',
    status: { id: 'inactive', name: 'Inactive' },
    reference: { type: { id: 'ref2' } },
    price: { amount: 20, currencyCode: 'GBP', text: '£20' },
    location: { id: 'loc2', name: 'Location 2' },
    theme: { id: 'theme2', name: 'Theme 2' },
  },
  {
    id: '3',
    name: 'Item 3',
    status: { id: 'pending', name: 'Pending' },
    reference: { type: { id: 'ref3' } },
    price: { amount: 30, currencyCode: 'GBP', text: '£30' },
    location: { id: 'loc3', name: 'Location 3' },
    theme: { id: 'theme3', name: 'Theme 3' },
  },
]

describe('DataCard Component', () => {
  it('renders cards with paginated items', () => {
    render(<DataCard paginatedItems={mockPaginatedItems} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('displays correct information for each card', () => {
    render(<DataCard paginatedItems={mockPaginatedItems} />)

    // ✅ Method 1: Use getByText with a function matcher
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Reference: ref1'
      })
    ).toBeInTheDocument()

    const container = screen.getByText('Reference:').closest('div')
    expect(container).toHaveTextContent('Reference: ref1')

    const referenceElements = screen.getAllByText('Reference:')
    expect(referenceElements[0].closest('div')).toHaveTextContent(
      'Reference: ref1'
    )

    // Check price - this should work as it's a single text node
    expect(screen.getByText('£10.00')).toBeInTheDocument()

    // Check other content using the same pattern
    expect(screen.getByText('Location:')).toBeInTheDocument()
    expect(screen.getByText('Location 1')).toBeInTheDocument()

    expect(screen.getByText('Theme:')).toBeInTheDocument()
    expect(screen.getByText('Theme 1')).toBeInTheDocument()

    // Check for status badges
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('renders empty state when no paginated items are provided', () => {
    render(<DataCard paginatedItems={[]} />)
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  // ✅ Additional test for better coverage
  it('handles items with missing optional data', () => {
    const itemsWithMissingData: DonationItem[] = [
      {
        id: '3',
        name: 'Item with missing data',
        status: { id: 'pending', name: 'Pending' },

        reference: { type: { id: '' } },
        price: { text: '', amount: 0, currencyCode: '' },
        location: { id: '', name: '' },
        theme: { id: '', name: '' },
      },
    ]

    render(<DataCard paginatedItems={itemsWithMissingData} />)

    expect(screen.getByText('Item with missing data')).toBeInTheDocument()

    // Check that N/A values are displayed
  })
})
