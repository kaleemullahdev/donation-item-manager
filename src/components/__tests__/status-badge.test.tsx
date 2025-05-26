import { render, screen } from '@testing-library/react'

import { StatusBadge } from '../status-badge'

describe('StatusBadge Component', () => {
  it('renders with active status', () => {
    render(<StatusBadge status={{ id: 'active', name: 'Active' }} />)
    const badge = screen.getByText('Active')
    expect(badge).toHaveClass('bg-green-100')
    expect(badge).toHaveClass('text-green-800')
    expect(badge).toHaveClass('border-green-200')
  })

  it('renders with inactive status', () => {
    render(<StatusBadge status={{ id: 'inactive', name: 'Inactive' }} />)
    const badge = screen.getByText('Inactive')
    expect(badge).toHaveClass('bg-red-100')
    expect(badge).toHaveClass('text-red-800')
    expect(badge).toHaveClass('border-red-200')
  })

  it('renders with pending status', () => {
    render(<StatusBadge status={{ id: 'pending', name: 'Pending' }} />)
    const badge = screen.getByText('Pending')
    expect(badge).toHaveClass('bg-yellow-100')
    expect(badge).toHaveClass('text-yellow-800')
    expect(badge).toHaveClass('border-yellow-200')
  })

  it('renders with unknown status', () => {
    render(<StatusBadge status={{ id: 'unknown', name: 'Unknown' }} />)
    const badge = screen.getByText('Unknown')
    expect(badge).toHaveClass('bg-gray-100')
    expect(badge).toHaveClass('text-gray-800')
    expect(badge).toHaveClass('border-gray-200')
  })
})
