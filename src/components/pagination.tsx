import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/shadcn/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): number[] => {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className='flex items-center justify-center space-x-2 mt-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='border-[#eb3569] text-[#eb3569] hover:bg-[#eb3569] hover:text-white'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      {getPageNumbers().map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size='sm'
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? 'bg-[#eb3569] hover:bg-[#eb3569]/90 text-white'
              : 'border-[#eb3569] text-[#eb3569] hover:bg-[#eb3569] hover:text-white'
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='border-[#eb3569] text-[#eb3569] hover:bg-[#eb3569] hover:text-white'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  )
}
