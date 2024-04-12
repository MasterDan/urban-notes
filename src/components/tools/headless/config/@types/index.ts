import { BaseProps, ValueOrObservableOrGetter } from '@rexar/core';
import { AnyConfig } from '../map-config';

type AnyRecord = Record<string, unknown>;

export type HBaseProps = {
  shadow?: ValueOrObservableOrGetter<string>;
};

export type ComponentConfig<
  TProps extends AnyRecord,
  TClasses extends AnyRecord,
> = { props: TProps; classes: TClasses };

export type CardConfig = ComponentConfig<
  {
    rounded: boolean;
  },
  {
    rounded: string;
  }
>;

export type ThemeConfig = {
  base: {
    shadows: AnyConfig;
  };
  card: CardConfig;
};

export type ComponentName = keyof ThemeConfig;

export type UiConfig<TThemes extends string> = {
  [TKey in TThemes]: Partial<ThemeConfig>;
} & { default: ThemeConfig };

export type UiConfigSeed<TThemes extends string> =
  | UiConfig<TThemes>
  | (() => UiConfig<TThemes>);

export type HeadlessProps = BaseProps;
