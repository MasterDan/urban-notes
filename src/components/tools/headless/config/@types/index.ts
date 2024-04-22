import { BaseProps } from '@rexar/core';
import { AnyMapConfig } from '../map-config';
import { MultiMapConfig } from '../multi-map-config';

export type BaseConfig<
  TShadows extends AnyMapConfig,
  TBorders extends AnyMapConfig,
> = MultiMapConfig<{
  shadows: TShadows;
  borders: TBorders;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyBaseConfig = BaseConfig<any, any>;

export type ThemeConfig<TBase extends AnyBaseConfig> = {
  base: TBase;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyThemeConfig = ThemeConfig<AnyBaseConfig>;

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
