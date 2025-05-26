import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vitest } from 'vitest'

import { Button } from '../button'

describe('Button Component', () => {
  it('renders button with default variant and size', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('h-9')
  })

  it('renders button with different variants', () => {
    const { rerender } = render(<Button variant='destructive'>Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')

    rerender(<Button variant='outline'>Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')

    rerender(<Button variant='secondary'>Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')

    rerender(<Button variant='ghost'>Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent')

    rerender(<Button variant='link'>Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-primary')
  })

  it('renders button with different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')

    rerender(<Button size='lg'>Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10')

    rerender(<Button size='icon'>Icon</Button>)
    expect(screen.getByRole('button')).toHaveClass('size-9')
  })

  it('handles click events', async () => {
    const handleClick = vitest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders button with icon', () => {
    render(
      <Button>
        <svg data-testid='icon' />
        With Icon
      </Button>
    )

    const button = screen.getByRole('button')
    const icon = screen.getByTestId('icon')

    expect(button).toHaveClass('gap-2')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveClass('bg-primary')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('handles focus states', async () => {
    render(<Button>Focus me</Button>)
    const button = screen.getByRole('button')

    await userEvent.tab()
    expect(button).toHaveFocus()
    expect(button).toHaveClass('focus-visible:ring-[3px]')
  })

  it('handles aria-invalid state', () => {
    render(<Button aria-invalid='true'>Invalid</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-invalid', 'true')
    expect(button).toHaveClass('aria-invalid:ring-destructive/20')
  })
})
