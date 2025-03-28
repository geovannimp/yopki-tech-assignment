import { createFactory } from 'hono/factory';
import { describeRoute } from 'hono-openapi';
import { resolver, validator as zValidator } from 'hono-openapi/zod';
import { z } from 'zod';
import { itineraryService } from '~/services/itinerary.service';

import 'zod-openapi/extend';

const createItineraryFactory = createFactory();

const responseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    itinerary: z.any(),
  }),
});

export const createItineraryRouteHandlers =
  createItineraryFactory.createHandlers(
    describeRoute({
      description: 'Create an itinerary',
      tags: ['Itinerary'],
      parameters: [
        {
          name: 'origin',
          in: 'query',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'Successful create itinerary response',
          content: {
            'application/json': {
              schema: resolver(responseSchema),
            },
          },
        },
      },
    }),
    zValidator(
      'json',
      z
        .object({
          origin: z.string(),
          destination: z.string(),
          departureDate: z.coerce.date(),
          returnDate: z.coerce.date(),
          travelers: z.number(),
        })
        .openapi({
          example: {
            origin: 'GRU',
            destination: 'FLN',
            departureDate: '2025-03-31T03:00:00.000Z' as unknown as Date,
            returnDate: '2025-04-09T03:00:00.000Z' as unknown as Date,
            travelers: 1,
          },
        })
    ),
    async (c) => {
      try {
        const { origin, destination, departureDate, returnDate, travelers } =
          c.req.valid('json');
        const { itinerary, plainTextItinerary } =
          await itineraryService.createItinerary({
            origin,
            destination,
            departureDate,
            returnDate,
            travelers,
          });

        return c.json({
          success: true,
          data: {
            itinerary,
            plainTextItinerary,
          },
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          500
        );
      }
    }
  );
