import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/shadcn/ui/sonner'

import DonationItems from './donation-items'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <DonationItems />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
