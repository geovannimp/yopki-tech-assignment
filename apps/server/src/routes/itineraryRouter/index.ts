import { Hono } from 'hono';
import { createItineraryRouteHandlers } from '~/routes/itineraryRouter/createItinerary.route';

export const itineraryRouter = new Hono().post(
  '/',
  ...createItineraryRouteHandlers
);
