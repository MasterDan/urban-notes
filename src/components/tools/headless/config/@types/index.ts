import { BaseProps } from '@rexar/core';
import { AnyMapConfig } from '../map-config';
import { FlexConfigMap, FlexItemConfigMap } from './flex';

export type BaseConfigMap<
  TShadows extends AnyMapConfig = AnyMapConfig,
  TBorders extends AnyMapConfig = AnyMapConfig,
  TBorderRadius extends AnyMapConfig = AnyMapConfig,
  TMargin extends AnyMapConfig = AnyMapConfig,
  TPadding extends AnyMapConfig = AnyMapConfig,
  TColor extends AnyMapConfig = AnyMapConfig,
> = {
  shadow: TShadows;
  border: TBorders;
  borderRadius: TBorderRadius;
  margin: TMargin;
  padding: TPadding;
  color: TColor;
};

export type ThemeConfig<
  TBaseMap extends BaseConfigMap = BaseConfigMap,
  TFlexMap extends FlexConfigMap = FlexConfigMap,
  TFlexItemMap extends FlexItemConfigMap = FlexItemConfigMap,
> = {
  base: TBaseMap;
  card?: Partial<TBaseMap>;
  flex?: TFlexMap;
  flexItem?: TFlexItemMap;
};

export type MultiThemeConfig<TThemeConfig extends ThemeConfig = ThemeConfig> =
  Record<string, TThemeConfig> & {
    default: TThemeConfig;
  };

export type UiConfig<TThemesMap extends MultiThemeConfig = MultiThemeConfig> = {
  [TKey in keyof TThemesMap]: Partial<TThemesMap[TKey]>;
} & {
  default: TThemesMap['default'];
};

export type UiConfigSeed<TThemes extends MultiThemeConfig> =
  | UiConfig<TThemes>
  | (() => UiConfig<TThemes>);

export type HeadlessProps = BaseProps;
