import { Card, CardContent } from '@/components/shadcn/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'
import { DonationItem } from '@/types'

import { StatusBadge } from './status-badge'

type Props = {
  paginatedItems: DonationItem[]
}
export const DataTable: React.FC<Props> = ({ paginatedItems }) => {
  return (
    <Card>
      <CardContent className='pl-10 pr-10'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Theme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map(item => {
              console.log('item', item)
              return (
                <TableRow key={item.id}>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell>{item.reference?.type.id || 'N/A'}</TableCell>
                  <TableCell>
                    {item.price ? `${item?.price?.text}` : `£0`}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>{item.location?.name || 'N/A'}</TableCell>
                  <TableCell>{item.theme?.name || 'N/A'}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
