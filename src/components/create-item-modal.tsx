import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult } from '@tanstack/react-query'
import { z } from 'zod'

import { Button } from '@/components/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { useMutation } from '@/hooks/useMutation'
import {
  CreateDonationItemRequest,
  DonationItem,
  Location,
  Theme,
} from '@/types'

// Zod schema for form validation
const createItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be less than 200 characters')
    .transform(val => val.trim()),
  locationId: z.string().min(1, 'Location is required'),
  themeId: z.string().min(1, 'Theme is required'),
  price: z
    .string()
    .optional()
    .refine(
      val => !val || (!isNaN(Number(val)) && parseFloat(val) > 0),
      'Price must be greater than 0'
    ),
})

type CreateItemFormData = z.infer<typeof createItemSchema>

type Props = {
  isOpen: boolean
  locations: Location[]
  themes: Theme[]
  toggleModal: () => void
  refetchDonationItems: () => Promise<
    QueryObserverResult<DonationItem[], Error>
  >
  existingNames: string[]
}

const API_BASE = 'https://n3o-coding-task-react.azurewebsites.net'

const createDonationItem = async (
  data: CreateDonationItemRequest
): Promise<DonationItem> => {
  const response = await fetch(`${API_BASE}/api/v1/donationItems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Failed to create donation item')
  }

  return response.json()
}

export const CreateItemModal: React.FC<Props> = ({
  isOpen,
  toggleModal,
  locations,
  themes,
  refetchDonationItems,
  existingNames,
}) => {
  const createItemSchemaWithUnique = createItemSchema.extend({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(200, 'Name must be between 1-200 characters')
      .transform(val => val.trim())
      .refine(
        val =>
          !existingNames.some(name => name.toLowerCase() === val.toLowerCase()),
        'Name must be unique'
      ),
  })

  const form = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemSchemaWithUnique),
    defaultValues: {
      name: '',
      locationId: '',
      themeId: '',
      price: '',
    },
    mode: 'onChange', // Validate on change for better UX
  })

  const queryClient = {
    invalidateQueries: (queryKey: string[]) => {
      console.log('Invalidating queries:', queryKey)
    },
  }

  const createMutation = useMutation(createDonationItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['donationItems'])
      refetchDonationItems()
      handleClose()
    },
    onError: error => {
      // Handle API errors - you could show a toast notification here
      console.error('Failed to create donation item:', error)
    },
  })

  const handleClose = () => {
    form.reset()
    toggleModal()
  }

  const onSubmit = async (data: CreateItemFormData) => {
    const payload: CreateDonationItemRequest = {
      name: data.name, // Already trimmed by zod transform
      location: data.locationId,
      theme: data.themeId,
      ...(data.price && {
        price: {
          amount: parseFloat(data.price),
          currencyCode: 'GBP',
        },
      }),
    }

    await createMutation.mutate(payload)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create New Donation Item</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter donation item name'
                      className='border-primary/20 focus:ring-primary focus:border-primary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='locationId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Location *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className='w-full'>
                      <SelectTrigger className='border-primary/20 focus:ring-primary focus:border-primary'>
                        <SelectValue placeholder='Select location' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map(location => (
                        <SelectItem key={location?.id} value={location?.id}>
                          {location?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='themeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className='w-full'>
                      <SelectTrigger className='border-primary/20 focus:ring-primary focus:border-primary'>
                        <SelectValue placeholder='Select theme' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {themes?.map(theme => (
                        <SelectItem key={theme?.id} value={theme?.id}>
                          {theme?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (£)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      step='0.01'
                      min='0.01'
                      placeholder='Enter price (optional)'
                      className='border-primary/20 focus:ring-primary focus:border-primary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2 pt-4'>
              <Button
                type='submit'
                disabled={createMutation.isPending || !form.formState.isValid}
                className='flex-1 bg-primary hover:bg-primary/90'
              >
                {createMutation.isPending ? 'Creating...' : 'Create'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={handleClose}
                className='flex-1 border-primary text-primary hover:bg-primary hover:text-white'
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
