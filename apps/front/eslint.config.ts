import { sheriff, type SheriffSettings, tseslint } from 'eslint-config-sheriff';

const sheriffOptions: SheriffSettings = {
  react: true,
  lodash: false,
  remeda: false,
  next: false,
  astro: false,
  playwright: false,
  jest: false,
  vitest: true,
};

export default tseslint.config(sheriff(sheriffOptions), {
  rules: {
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
});
