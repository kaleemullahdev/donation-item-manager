import React, { useEffect, useState } from 'react'

import { Filter, Grid, List, ListRestart, Plus } from 'lucide-react'

import { DataCard } from '@/components/data-card'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { ITEMS_PER_PAGE } from '@/constants'
import { useQueryAllDonationItems } from '@/hooks/useQueryAllDonationItems'
import { useQueryDonationLocations } from '@/hooks/useQueryDonationLocations'
import { useQueryDonationStatuses } from '@/hooks/useQueryDonationStatuses'
import { useQueryDonationThemes } from '@/hooks/useQueryDonationThemes'
import { DonationItem } from '@/types'

import { CreateItemModal } from './components/create-item-modal'
import { DataTable } from './components/data-table'
import { useIsMobile } from './hooks/useIsMobile'

const DonationItemsApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpen, setIsModalOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()

  const {
    data: donationItems = [],
    isFetching: isLoading,
    error,
    refetch: refetchDonationItems,
  } = useQueryAllDonationItems()

  const { data: locations = [] } = useQueryDonationLocations()
  const { data: allStatus = [] } = useQueryDonationStatuses()
  const { data: themes = [] } = useQueryDonationThemes()

  const filteredItems = donationItems.filter(
    (item: DonationItem) =>
      statusFilter === 'all' || item?.status?.name === statusFilter
  )

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter])

  // Set default view mode based on screen size
  useEffect(() => {
    if (isMobile) {
      setViewMode('list')
    }
  }, [isMobile])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Card className='w-96'>
          <CardContent className='pt-6'>
            <p className='text-red-600 text-center'>
              Error loading data: {error.message}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className='w-full mt-4 bg-primary hover:bg-primary/90'
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const toggleModal = () => setIsModalOpen(!isOpen)
  const isViewModeTable = viewMode == 'table'

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Donation Items
          </h1>
          <p className='text-gray-600'>Manage and view donation items</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 mb-6 justify-between'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-gray-500' />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-48 border-primary/20 focus:ring-primary focus:border-primary'>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Statuses</SelectItem>
                  {allStatus?.map(status => (
                    <SelectItem key={status.id} value={status.name}>
                      {status?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!isMobile && (
              <div className='flex items-center gap-2'>
                <Button
                  variant={isViewModeTable ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('table')}
                  className={
                    isViewModeTable
                      ? 'bg-primary hover:bg-primary/90'
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }
                >
                  <Grid className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('list')}
                  className={
                    viewMode === 'list'
                      ? 'bg-primary hover:bg-primary/90'
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }
                >
                  <List className='h-4 w-4' />
                </Button>
              </div>
            )}

            <Button
              className='bg-primary hover:bg-primary/90 text-white'
              onClick={toggleModal}
            >
              <Plus className='h-4 w-4 mr-2' />
              Add Donation Item
            </Button>

            <Button className='bg-primary hover:bg-primary/90 text-white'>
              <ListRestart className='h-4 w-4 mr-2' />
              Reset Data
            </Button>
          </div>

          <CreateItemModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            locations={locations}
            refetchDonationItems={refetchDonationItems}
            themes={themes}
            existingNames={donationItems.map(item => item.name)}
          />
        </div>

        {isViewModeTable && !isMobile ? (
          <DataTable paginatedItems={paginatedItems} />
        ) : (
          <DataCard paginatedItems={paginatedItems} />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {filteredItems.length === 0 && (
          <Card className='mt-8'>
            <CardContent className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No donation items found</p>
              <p className='text-gray-400 text-sm mt-2'>
                {statusFilter !== 'all'
                  ? 'Try changing the status filter'
                  : 'Create your first donation item to get started'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DonationItemsApp
