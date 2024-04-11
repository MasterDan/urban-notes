import { defineConfig } from './tools/headless/config';
import { MapConfig } from './tools/headless/config/map-config';

export const shadows = new MapConfig(
  {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'xl': 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  'none',
);

export const config = defineConfig({
  default: {
    base: {
      shadows,
    },
    card: {
      classes: {
        rounded: 'rounded-3xl',
      },
      props: {
        rounded: true,
      },
    },
  },
});

