import { defineConfig } from './headless/config';
import { FlexConfigMap } from './headless/config/@types/flex';
import { MapConfig } from './headless/config/map-config';

export const componentsConfig = defineConfig(() => {
  const shadow = new MapConfig(
    {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'xl': 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    'none',
  );

  const border = new MapConfig(
    {
      '0': 'border-0',
      'default': 'border',
      '2': 'border-2',
      '4': 'border-4',
      '8': 'border-8',
    },
    '0',
  );

  const borderRadius = new MapConfig(
    {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    'none',
  );

  const color = new MapConfig(
    {
      transparent: 'bg-transparent',
      background: 'bg-slate-900',
      card: 'bg-slate-900/75 backdrop-blur-xl',
      text: 'text-slate-400',
    },
    'transparent',
  );

  const margin = new MapConfig(
    {
      '0': 'm-0',
      '0.5': 'm-0.5',
      '1': 'm-1',
      '1.5': 'm-1.5',
      '2': 'm-2',
      '2.5': 'm-2.5',
      '3': 'm-3',
      '3.5': 'm-3.5',
      '4': 'm-4',
    },
    '0',
  );

  const padding = new MapConfig(
    {
      '0': 'p-0',
      '0.5': 'p-0.5',
      '1': 'p-1',
      '1.5': 'p-1.5',
      '2': 'p-2',
      '2.5': 'p-2.5',
      '3': 'p-3',
      '3.5': 'p-3.5',
      '4': 'p-4',
    },
    '0',
  );

  const flex: FlexConfigMap = {
    display: new MapConfig({ flex: 'flex' }, 'flex'),
    direction: new MapConfig(
      {
        'row': 'flex-row',
        'row-reverse': 'flex-row-reverse',
        'column': 'flex-col',
        'column-reverse': 'flex-col-reverse',
      },
      'row',
    ),
    gap: new MapConfig(
      { '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4' },
      '3',
    ),
    justifyItems: new MapConfig(
      {
        start: 'justify-items-start',
        end: 'justify-items-end',
        center: 'justify-items-center',
        stretch: 'justify-items-stretch',
      },
      'stretch',
    ),
    justifyContent: new MapConfig(
      {
        normal: 'justify-normal',
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
        around: 'justify-around',
        between: 'justify-between',
        evenly: 'justify-evenly',
        stretch: 'justify-stretch',
      },
      'normal',
    ),
    align: new MapConfig(
      {
        stretch: 'items-stretch',
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
      },
      'stretch',
    ),
  };

  return {
    default: {
      base: {
        border,
        borderRadius,
        shadow,
        color,
        margin,
        padding,
      },
      card: {
        borderRadius: borderRadius.withDefaultValue('lg'),
        color: color.withDefaultValue(['card', 'text']),
        padding: padding.withDefaultValue('2'),
      },
      flex,
    },
  };
});
