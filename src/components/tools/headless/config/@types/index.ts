import { BaseProps } from '@rexar/core';
import { AnyMapConfig } from '../map-config';

export type BaseConfigMap<
  TShadows extends AnyMapConfig,
  TBorders extends AnyMapConfig,
  TBorderRadius extends AnyMapConfig,
  TMargin extends AnyMapConfig,
  TPadding extends AnyMapConfig,
  TColor extends AnyMapConfig,
> = {
  shadow: TShadows;
  border: TBorders;
  borderRadius: TBorderRadius;
  margin: TMargin;
  padding: TPadding;
  color: TColor;
};

export type AnyBaseConfigMap = BaseConfigMap<
  AnyMapConfig,
  AnyMapConfig,
  AnyMapConfig,
  AnyMapConfig,
  AnyMapConfig,
  AnyMapConfig
>;

export type ThemeConfig<TBaseMap extends AnyBaseConfigMap> = {
  base: TBaseMap;
  card?: Partial<TBaseMap>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyThemeConfig = ThemeConfig<AnyBaseConfigMap>;

export type MultiThemeConfig<TThemeConfig extends AnyThemeConfig> = Record<
  string,
  TThemeConfig
> & {
  default: TThemeConfig;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMultiThemeConfig = MultiThemeConfig<AnyThemeConfig>;

export type UiConfig<TThemesMap extends AnyMultiThemeConfig> = {
  [TKey in keyof TThemesMap]: Partial<TThemesMap[TKey]>;
} & {
  default: TThemesMap['default'];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyUiConfig = UiConfig<any>;

export type UiConfigSeed<TThemes extends AnyMultiThemeConfig> =
  | UiConfig<TThemes>
  | (() => UiConfig<TThemes>);

export type HeadlessProps = BaseProps;
