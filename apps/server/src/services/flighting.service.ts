import { getJson } from 'serpapi';
import { env } from '~/lib/env';
import type { GoogleFlightsResponse } from '~/types/flighting.types';

export const flightingService = {
  getFlight: async ({
    departureAirportId,
    arrivalAirportId,
    departureDate,
    returnDate,
    currency = 'USD',
  }: {
    departureAirportId: string;
    arrivalAirportId: string;
    departureDate: Date;
    returnDate: Date;
    currency?: string;
  }) => {
    const response = (await getJson({
      api_key: env.SERP_API_TOKEN,
      engine: 'google_flights',
      departure_id: departureAirportId,
      arrival_id: arrivalAirportId,
      outbound_date: departureDate.toISOString().split('T')[0],
      return_date: returnDate.toISOString().split('T')[0],
      currency,
    })) as GoogleFlightsResponse;

    const flightDetails = response.best_flights[0];

    if (!flightDetails) {
      throw new Error('No flight found');
    }

    return {
      flights: flightDetails.flights.map((flight) => ({
        departureAirportName: flight.departure_airport.name,
        departureAirportId: flight.departure_airport.id,
        departureTime: flight.departure_airport.time,
        arrivalAirportName: flight.arrival_airport.name,
        arrivalAirportId: flight.arrival_airport.id,
        arrivalTime: flight.arrival_airport.time,
        duration: flight.duration,
      })),
      totalDuration: flightDetails.total_duration,
      price: flightDetails.price,
    };
  },
};
