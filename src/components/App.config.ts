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

export const colors = new MapConfig(
  {
    background: 'bg-slate-900',
    text: 'text-slate-400',
  },
  'background',
);

export const config = defineConfig({
  default: {
    base: {
      shadows,
      borders: shadows,
      colors,
      spacing: shadows,
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
