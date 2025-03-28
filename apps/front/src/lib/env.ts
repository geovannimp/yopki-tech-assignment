import { z } from 'zod';

const envValidator = z.object({
  VITE_SERVER_ENDPOINT: z.string(),
});

export const env = (
  process.env.ENV_VALIDATION === 'false'
    ? process.env
    : envValidator.parse(import.meta.env)
) as z.infer<typeof envValidator>;

if (env instanceof z.ZodError) {
  throw new TypeError(env.message);
}
