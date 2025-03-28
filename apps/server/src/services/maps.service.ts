import { getJson } from 'serpapi';
import { env } from '~/lib/env';
import type { GoogleMapsSearchResult } from '~/types/maps.types';

export const mapsService = {
  getCoffees: async ({
    city,
    neighborhood,
  }: {
    city: string;
    neighborhood: string;
  }) => {
    const response = (await getJson({
      api_key: env.SERP_API_TOKEN,
      engine: 'google_maps',
      q: `Coffee in ${city} ${neighborhood}`,
      type: 'search',
    })) as GoogleMapsSearchResult;

    return 'local_results' in response
      ? response.local_results.map((result) => ({
          name: result.title,
          address: result.address,
          rating: result.rating,
          reviews: result.reviews,
          description: result.description,
          image: result.thumbnail,
          links: {
            website: result.website,
            phone: result.phone,
          },
        }))
      : [
          {
            name: response.place_results.title,
            address: response.place_results.address,
            rating: response.place_results.rating,
            reviews: response.place_results.reviews,
            description: response.place_results.description,
            image: response.place_results.thumbnail,
            links: {
              website: response.place_results.website,
              phone: response.place_results.phone,
            },
          },
        ];
  },

  getPlace: async ({ city, address }: { city: string; address: string }) => {
    const response = (await getJson({
      api_key: env.SERP_API_TOKEN,
      engine: 'google_maps',
      q: `${address} in ${city}`,
      type: 'search',
    })) as GoogleMapsSearchResult;

    console.log({ response });

    return 'local_results' in response
      ? response.local_results.map((result) => ({
          name: result.title,
          address: result.address,
          rating: result.rating,
          reviews: result.reviews,
          description: result.description,
          image: result.thumbnail,
          links: {
            website: result.website,
            phone: result.phone,
          },
        }))
      : [
          {
            name: response.place_results.title,
            address: response.place_results.address,
            rating: response.place_results.rating,
            reviews: response.place_results.reviews,
            description: response.place_results.description,
            image: response.place_results.thumbnail,
            links: {
              website: response.place_results.website,
              phone: response.place_results.phone,
            },
          },
        ];
  },
};
