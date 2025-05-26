import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { DonationItem } from '@/types'

import { DataTable } from '../data-table'

// ✅ Correct import

// ✅ Complete items
const mockPaginatedItems: DonationItem[] = [
  {
    id: '1',
    name: 'Item 1',
    status: { id: 'active', name: 'Active' },
    reference: { type: { id: 'ref1' } },
    price: { amount: 10, currencyCode: 'GBP', text: '£10.00' },
    location: { id: 'loc1', name: 'Location 1' },
    theme: { id: 'theme1', name: 'Theme 1' },
  },
  {
    id: '2',
    name: 'Item 2',
    status: { id: 'inactive', name: 'Inactive' },
    reference: { type: { id: 'ref2' } },
    price: { amount: 20, currencyCode: 'GBP', text: '£20.00' },
    location: { id: 'loc2', name: 'Location 2' },
    theme: { id: 'theme2', name: 'Theme 2' },
  },
]

// ✅ Items with null fields
const mockItemsWithMissingData: DonationItem[] = [
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

describe('DataTable Component', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(<DataTable paginatedItems={mockPaginatedItems} />)
    ).not.toThrow()
  })

  it('renders table headers correctly', () => {
    render(<DataTable paginatedItems={mockPaginatedItems} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Reference')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
  })

  it('renders all item rows', () => {
    render(<DataTable paginatedItems={mockPaginatedItems} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('displays correct content for each item in table cells', () => {
    render(<DataTable paginatedItems={mockPaginatedItems} />)

    // First item
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('ref1')).toBeInTheDocument()
    expect(screen.getByText('£10.00')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Location 1')).toBeInTheDocument()
    expect(screen.getByText('Theme 1')).toBeInTheDocument()

    // Second item
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('ref2')).toBeInTheDocument()
    expect(screen.getByText('£20.00')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
    expect(screen.getByText('Location 2')).toBeInTheDocument()
    expect(screen.getByText('Theme 2')).toBeInTheDocument()
  })

  it('handles missing data gracefully by showing "N/A" or default values', () => {
    render(<DataTable paginatedItems={mockItemsWithMissingData} />)

    expect(screen.getByText('Item with missing data')).toBeInTheDocument()
    expect(screen.getByText('£0')).toBeInTheDocument() // Default price
    expect(screen.getByText('Pending')).toBeInTheDocument()

    // Check for multiple N/A values (reference, location, theme)
    const naElements = screen.getAllByText('N/A')
    expect(naElements).toHaveLength(3) // Reference, Location, Theme
  })

  it('renders nothing if no items are passed', () => {
    const { container } = render(<DataTable paginatedItems={[]} />)

    // Component returns null when no items
    expect(container.firstChild).toBeNull()
  })

  it('renders table structure correctly', () => {
    render(<DataTable paginatedItems={mockPaginatedItems} />)

    // Check table structure
    expect(screen.getByRole('table')).toBeInTheDocument()

    // Check for table rows (header + 2 data rows)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 1 header + 2 data rows
  })

  it('applies correct styling to name cell', () => {
    render(<DataTable paginatedItems={mockPaginatedItems} />)

    const nameCell = screen.getByText('Item 1').closest('td')
    expect(nameCell).toHaveClass(
      'font-medium',
      'max-w-[200px]',
      'break-words',
      'whitespace-normal'
    )
  })
})
