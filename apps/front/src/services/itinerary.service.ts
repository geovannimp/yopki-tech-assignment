import { env } from '~/lib/env';
import type { ItineraryResult } from '~/types/itinerary.types';

export const itineraryService = {
  createItinerary: async ({
    origin,
    destination,
    departureDate,
    returnDate,
    travelers,
  }: {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate: Date;
    travelers: number;
  }) => {
    const body = JSON.stringify({
      origin,
      destination,
      departureDate,
      returnDate,
      travelers,
    });
    console.log(body);
    const response = await fetch(`${env.VITE_SERVER_ENDPOINT}/itinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    return (response.json() as Promise<ItineraryResult>).then((response) => {
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error);
      }
    });
  },
};
