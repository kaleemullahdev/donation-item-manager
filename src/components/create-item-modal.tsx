import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult } from '@tanstack/react-query'
import { toast } from 'sonner'
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
import { useMutationAddDonationItems } from '@/hooks/useMutationAddDonationItems'
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

export const CreateItemModal: React.FC<Props> = ({
  isOpen,
  toggleModal,
  locations,
  themes,
  refetchDonationItems,
  existingNames,
}) => {
  const onSuccess = () => {
    refetchDonationItems()
    toast.success('Donation has been created', { className: 'bg-primary' })
    handleClose()
  }

  const onError = (error: Error) => {
    toast.error(`Failed to create donation item:${error}`, {
      className: 'bg-warning',
    })
  }

  const { addDonationItemMutation, isPending } = useMutationAddDonationItems({
    onSettled: onSuccess,
    onSuccess: onSuccess,
    onError,
  })
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

  const handleClose = () => {
    form.reset()
    toggleModal()
  }

  const onSubmit = async (data: CreateItemFormData) => {
    const payload: CreateDonationItemRequest = {
      name: data.name,
      location: data.locationId,
      theme: data.themeId,
      ...(data.price && {
        price: {
          amount: parseFloat(data.price),
          currencyCode: 'GBP',
        },
      }),
    }

    await addDonationItemMutation(payload)
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
                disabled={isPending || !form.formState.isValid}
                className='flex-1 bg-primary hover:bg-primary/90 cursor-pointer'
              >
                {isPending ? 'Creating...' : 'Create'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={handleClose}
                className='flex-1 border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'
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
