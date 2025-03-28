import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { date, z } from 'zod';
import { airports } from '@nwpr/airport-codes';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { format, setDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '~/components/ui/calendar';
import { itineraryService } from '~/services/itinerary.service';
import Select from '~/components/select';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const now = new Date();

const airportOptions = airports
  .filter((airport) => airport.iata)
  .map((airport) => ({
    value: airport.iata as string,
    label: [airport.name, airport.iata].join(' - '),
  }));

export const Route = createFileRoute('/')({
  component: Home,
  ssr: false,
});

const formSchema = z.object({
  origin: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  destination: z.string().min(2, {
    message: 'Destination must be at least 2 characters.',
  }),
  dates: z
    .object({
      departureDate: z.date().min(now, {
        message: 'Departure date must be in the future.',
      }),
      returnDate: z.date().min(now, {
        message: 'Return date must be in the future.',
      }),
    })
    .refine((date) => date.departureDate !== now, {
      message: 'Departure date must be selected.',
    })
    .refine((date) => date.returnDate !== now, {
      message: 'Return date must be selected.',
    })
    .refine((data) => data.departureDate < data.returnDate, {
      message: 'Return date must be after departure date.',
    }),
  travelers: z.number().min(1, {
    message: 'At least 1 traveler is required.',
  }),
});

function Home() {
  const {
    mutate: createItinerary,
    isPending,
    data,
  } = useMutation({
    mutationFn: itineraryService.createItinerary,
  });

  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      origin: '',
      destination: '',
      dates: {
        departureDate: now,
        returnDate: now,
      },
      travelers: 1,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      return createItinerary({
        origin: value.origin,
        destination: value.destination,
        departureDate: value.dates.departureDate,
        returnDate: value.dates.returnDate,
        travelers: value.travelers,
      });
    },
  });

  useEffect(() => {
    console.log(state.errors);
  }, [state.errors]);

  return (
    <div className='container flex flex-col gap-6'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <p className='leading-28 h-28 text-center text-2xl font-bold'>
          Yopki Itinerary
        </p>
        <div className='grid grid-cols-2 gap-2'>
          <Field
            name='origin'
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <Select
                  id={field.name}
                  label='Origin'
                  value={field.state.value}
                  options={airportOptions}
                  placeholder='Select origin'
                  onChange={(value) => field.handleChange(value)}
                />
                {field.state.meta.errors?.[0]?.message && (
                  <p className='text-muted-foreground text-sm'>
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Field
            name='destination'
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <Select
                  id={field.name}
                  label='Destination'
                  value={field.state.value}
                  options={airportOptions}
                  placeholder='Select destination'
                  onChange={(value) => field.handleChange(value)}
                />
                {field.state.meta.errors?.[0]?.message && (
                  <p className='text-muted-foreground text-sm'>
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Field
            name='dates'
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id='date'
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon />
                      {field.state.value.departureDate !== now ? (
                        field.state.value.returnDate !== now ? (
                          <>
                            {format(
                              field.state.value.departureDate,
                              'LLL dd, y'
                            )}{' '}
                            -{' '}
                            {format(field.state.value.returnDate, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.state.value.departureDate, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      initialFocus
                      mode='range'
                      defaultMonth={field.state.value.departureDate}
                      selected={{
                        from:
                          field.state.value.departureDate === now
                            ? undefined
                            : field.state.value.departureDate,
                        to:
                          field.state.value.returnDate === now
                            ? undefined
                            : field.state.value.returnDate,
                      }}
                      onSelect={(range) => {
                        field.handleChange({
                          departureDate: range?.from ?? now,
                          returnDate: range?.to ?? now,
                        });
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {field.state.meta.errors?.[0]?.message && (
                  <p className='text-muted-foreground text-sm'>
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Field
            name='travelers'
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder='Travelers'
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.errors?.[0]?.message && (
                  <p className='text-muted-foreground text-sm'>
                    {field.state.meta.errors?.[0]?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <Button type='submit' className='w-full'>
          Search
        </Button>
      </form>

      {isPending && <p className='w-full text-center'>Loading...</p>}

      {data && (
        <pre className='w-full text-sm'>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
