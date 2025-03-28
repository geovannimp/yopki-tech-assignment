import 'zod-openapi/extend';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { openAPISpecs } from 'hono-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { env } from '~/lib/env';
import { onError } from '~/middleware/onError';
import { itineraryRouter } from '~/routes/itineraryRouter';

export const app = new Hono()
  .use(
    cors({
      credentials: true,
      origin: '*',
      allowHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .onError(onError);

app
  .route('/itinerary', itineraryRouter)
  .get(
    '/openapi',
    openAPISpecs(app, {
      documentation: {
        info: {
          title: 'Itinerary Service',
          version: '1.0.0',
          description: 'API for Itinerary Service',
        },
        servers: [
          {
            url: `http://localhost:${String(env.PORT ?? 8080)}`,
            description: 'Local server',
          },
        ],
      },
    })
  )
  .get(
    '/docs',
    apiReference({
      theme: 'elysiajs',
      spec: {
        url: '/openapi',
      },
    })
  );

export type App = typeof app;
