import { BaseProps } from '@rexar/core';
import { AnyProp } from '../prop';
import { FlexConfigMap, FlexItemConfigMap } from './flex';

export type BaseConfigMap<
  TShadows extends AnyProp = AnyProp,
  TBorders extends AnyProp = AnyProp,
  TBorderRadius extends AnyProp = AnyProp,
  TMargin extends AnyProp = AnyProp,
  TPadding extends AnyProp = AnyProp,
  TColor extends AnyProp = AnyProp,
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
