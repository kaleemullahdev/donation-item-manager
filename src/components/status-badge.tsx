import { Badge } from '@/components/shadcn/ui/badge'

interface StatusBadgeProps {
  status: { id: string; name: string }
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Badge className={`${getStatusColor(status?.id)} border`}>
      {status.name || 'Unknown'}
    </Badge>
  )
}
