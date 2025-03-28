import { z } from 'zod';

const envValidator = z.object({
  NODE_ENV: z.string().optional(),
  OPENAI_API_TOKEN: z.string(),
  SERP_API_TOKEN: z.string(),
  PORT: z.string().pipe(z.coerce.number()).optional(),
});

export const env = (
  process.env.ENV_VALIDATION === 'false'
    ? process.env
    : envValidator.parse(process.env)
) as z.infer<typeof envValidator>;

if (env instanceof z.ZodError) {
  throw new TypeError(env.message);
}
