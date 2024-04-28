import { defineConfig } from './headless/config';
import { Prop } from './headless/config/prop';

export const componentsConfig = defineConfig(() => {
  const shadow = new Prop(
    {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'xl': 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    'none',
  );

  const border = new Prop(
    {
      '0': 'border-0',
      'default': 'border',
      '2': 'border-2',
      '4': 'border-4',
      '8': 'border-8',
    },
    '0',
  );

  const borderRadius = new Prop(
    {
      'none': 'rounded-none',
      'round': 'rounded-2xl',
      'round-top': 'rounded-t-2xl',
      'round-bottom': 'rounded-b-2xl',
    },
    'none',
  );

  const color = new Prop(
    {
      'transparent': 'bg-transparent',
      'background': 'bg-slate-900',
      'card': 'bg-slate-900/70 backdrop-blur-xl',
      'card-header': 'bg-slate-900/75 backdrop-blur-xl',
      'card-footer': 'bg-slate-900/75 backdrop-blur-xl',
      'text': 'text-slate-400',
    },
    'transparent',
  );

  const margin = new Prop(
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

  const padding = new Prop(
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

  const flex = {
    display: new Prop({ flex: 'flex' }, 'flex'),
    direction: new Prop(
      {
        'row': 'flex-row',
        'row-reverse': 'flex-row-reverse',
        'column': 'flex-col',
        'column-reverse': 'flex-col-reverse',
      },
      'row',
    ),
    gap: new Prop(
      { '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4' },
      '3',
    ),
    justifyItems: new Prop(
      {
        start: 'justify-items-start',
        end: 'justify-items-end',
        center: 'justify-items-center',
        stretch: 'justify-items-stretch',
      },
      'stretch',
    ),
    justifyContent: new Prop(
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
    align: new Prop(
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
  const grow = new Prop(
    {
      'grow': 'grow',
      '0': 'grow-0',
    },
    '0',
  );
  const shrink = new Prop(
    {
      'shrink': 'shrink',
      '0': 'shrink-0',
    },
    '0',
  );
  const alignSelf = new Prop(
    {
      auto: 'self-auto',
      start: 'self-start',
      end: 'self-end',
      center: 'self-center',
      stretch: 'self-stretch',
      baseline: 'self-baseline',
    },
    'auto',
  );
  const justifySelf = new Prop(
    {
      auto: 'justify-self-auto',
      start: 'justify-self-start',
      end: 'justify-self-end',
      center: 'justify-self-center',
      stretch: 'justify-self-stretch',
    },
    'auto',
  );

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
        borderRadius: borderRadius.withDefaultValue('round'),
      },
      cardHeader: {
        color: color.withDefaultValue(['card-header', 'text']),
        borderRadius: borderRadius.withDefaultValue('round-top'),
        padding: padding.withDefaultValue('2'),
      },
      cardBody: {
        color: color.withDefaultValue(['card', 'text']),
        padding: padding.withDefaultValue('2'),
      },
      cardFooter: {
        color: color.withDefaultValue(['card-footer', 'text']),
        borderRadius: borderRadius.withDefaultValue('round-bottom'),
        padding: padding.withDefaultValue('2'),
      },
      flex,
      flexItem: {
        grow,
        shrink,
        alignSelf,
        justifySelf,
      },
    },
  };
});
