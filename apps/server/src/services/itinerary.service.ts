import { generateObject, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { differenceInCalendarDays } from 'date-fns';
import { z } from 'zod';
import { flightingService } from '~/services/flighting.service';
import { env } from '~/lib/env';
import { mapsService } from '~/services/maps.service';
import type { Itinerary } from '~/types/itinerary.types';

const openai = createOpenAI({
  apiKey: env.OPENAI_API_TOKEN,
});

const getCoffeeActivities = async ({
  destination,
}: {
  destination: string;
}) => {
  const {
    object: { neighborhoods, city },
  } = await generateObject({
    model: openai.responses('o3-mini'),
    schema: z.object({
      city: z.string(),
      neighborhoods: z.array(z.string()),
    }),
    prompt: `You are a travel guide. You are given the ${destination} airport destination and need to return a list of the best two neighborhoods in the destination that are good for coffee.`,
  });

  const coffeePlaces = await Promise.all(
    neighborhoods.map((neighborhood) =>
      mapsService
        .getCoffees({
          city,
          neighborhood,
        })
        .then((places) => places.slice(0, 2))
    )
  ).then((r) => r.flatMap((r) => r));

  return coffeePlaces;
};

const getSoloActivities = async ({ destination }: { destination: string }) => {
  const {
    object: { activities, city },
  } = await generateObject({
    model: openai.responses('o3-mini'),
    schema: z.object({
      city: z.string(),
      activities: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          address: z.string(),
        })
      ),
    }),
    prompt: `You are a travel guide. You are given the ${destination} airport destination and need to return a list of the best three solo activities with a short description and address in the destination.`,
  });

  console.log({ activities, city });

  const soloActivities = await Promise.all(
    activities.map((activity) =>
      mapsService
        .getPlace({
          city,
          address: activity.address,
        })
        .then((places) =>
          places.slice(0, 1).map((place) => ({
            ...place,
            name: activity.name,
            description: activity.description,
          }))
        )
    )
  ).then((r) => r.flatMap((r) => r));

  return soloActivities;
};

const getTravelTimeInDays = ({
  departureDate,
  returnDate,
}: {
  departureDate: Date;
  returnDate: Date;
}) => {
  const days = differenceInCalendarDays(returnDate, departureDate) + 1;
  return days;
};

const getActivities = async ({ destination }: { destination: string }) => {
  return Promise.all([
    getCoffeeActivities({
      destination,
    }),
    getSoloActivities({
      destination,
    }),
  ]).then((r) => r.flatMap((r) => r));
};

const getPlainTextItinerary = async ({
  itinerary,
}: {
  itinerary: Itinerary;
}) => {
  const { text } = await generateText({
    model: openai.responses('o3-mini'),
    prompt: `You are a travel guide. You are given a json object that contains an itinerary and need to return a plain human readable text itinerary travel guide. JSON: ${JSON.stringify(itinerary)}`,
  });

  return text;
};

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
    const travelDays = getTravelTimeInDays({
      departureDate,
      returnDate,
    });

    const activities = await getActivities({
      destination,
    });

    const flight = await flightingService.getFlight({
      departureAirportId: origin,
      arrivalAirportId: destination,
      departureDate,
      returnDate,
    });

    const itinerary = {
      travelDays,
      origin,
      destination,
      flight,
      activities,
      travelers,
    } satisfies Itinerary;

    const plainTextItinerary = await getPlainTextItinerary({
      itinerary,
    });

    return { itinerary, plainTextItinerary };
  },
};
