import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { env } from '~/lib/env';

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;
  const statusCode: ContentfulStatusCode =
    currentStatus === 200 ? 500 : (currentStatus as ContentfulStatusCode);
  const nodeEnv = env.NODE_ENV;
  const isProduction = nodeEnv === 'production';

  if (!isProduction) {
    console.error(err);
  }

  return c.json(
    {
      success: false,
      error: err.message,
      stack: isProduction ? undefined : err.stack,
    },
    statusCode
  );
};
