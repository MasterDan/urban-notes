import { BaseProps } from '@rexar/core';

type AnyRecord = Record<string, unknown>;

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
  card: CardConfig;
};

export type ComponentName = keyof ThemeConfig;

export type UiConfig<TThemes extends string> = {
  [TKey in TThemes]: Partial<ThemeConfig>;
} & { default: ThemeConfig };

export type UiConfigSeed<TThemes extends string> =
  | ThemeConfig
  | UiConfig<TThemes>
  | (() => ThemeConfig | UiConfig<TThemes>);

export type HeadlessProps = BaseProps;

