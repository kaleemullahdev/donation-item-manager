import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card'
import { DonationItem } from '@/types'

import { StatusBadge } from './status-badge'

type Props = {
  paginatedItems: DonationItem[]
}

export const DataCard: React.FC<Props> = ({ paginatedItems }) => {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {paginatedItems.map(item => (
        <Card key={item.id} className='hover:shadow-md transition-shadow'>
          <CardHeader>
            <div className='flex justify-between items-start'>
              <CardTitle className='text-lg'>{item.name}</CardTitle>
              <StatusBadge status={item.status} />
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='text-sm text-gray-600'>
              <span className='font-medium'>Reference:</span>{' '}
              {item.reference?.type?.id || 'N/A'}
            </div>
            <div className='text-sm text-gray-600'>
              <span className='font-medium'>Price:</span>{' '}
              {item.price ? `£${item.price.amount?.toFixed(2)}` : 'N/A'}
            </div>
            <div className='text-sm text-gray-600'>
              <span className='font-medium'>Location:</span>{' '}
              {item.location?.name || 'N/A'}
            </div>
            <div className='text-sm text-gray-600'>
              <span className='font-medium'>Theme:</span>{' '}
              {item.theme?.name || 'N/A'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
