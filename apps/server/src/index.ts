import '~/lib/env';
import { serve } from '@hono/node-server';
import { app } from '~/app';
import { env } from '~/lib/env';

const port = env.PORT ?? 8080;

serve({
  fetch: app.fetch,
  port,
});

console.info(`Listening on http://localhost:${String(port)}`);
