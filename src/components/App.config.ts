import { defineConfig } from './tools/headless/config';
import { MapConfig } from './tools/headless/config/map-config';
import { MultiMapConfig } from './tools/headless/config/multi-map-config';

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

export const borders = new MapConfig(
  {
    '0': 'border-0',
    '1': 'border',
    '2': 'border-2',
    '4': 'border-4',
    '8': 'border-8',
  },
  '0',
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
    base: new MultiMapConfig({
      borders,
      shadows,
    }),
  },
});
