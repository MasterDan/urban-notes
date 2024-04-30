import { BaseProps, ValueOrObservableOrGetter } from '@rexar/core';
import { AnyProp } from '../prop';
import { FlexConfigMap, FlexItemConfigMap } from './flex';
import { ComponentProps, ConfigMap } from '../multi-map-config';

export type Variants<
  T,
  TDefault extends { default: T } & Record<string, T> = { default: T },
> = TDefault & Record<string, T>;

export type VariantConfigMap<
  T extends ConfigMap | Partial<ConfigMap>,
  TDefault extends { default: T } & Record<string, T> = { default: T },
> = Variants<T, TDefault>;

export type AnyVariantConfigMap = VariantConfigMap<ConfigMap>;

export type MultiTypeComponentProps<TVMap extends AnyVariantConfigMap> =
  ComponentProps<TVMap['default']> & {
    type?: ValueOrObservableOrGetter<keyof TVMap>;
  };

export type BaseConfigMap<
  TShadows extends AnyProp = AnyProp,
  TBorders extends AnyProp = AnyProp,
  TBorderRadius extends AnyProp = AnyProp,
  TMargin extends AnyProp = AnyProp,
  TPadding extends AnyProp = AnyProp,
  TColor extends AnyProp = AnyProp,
  THeight extends AnyProp = AnyProp,
  TWidth extends AnyProp = AnyProp,
  TBackdrop extends AnyProp = AnyProp,
> = {
  shadow: TShadows;
  border: TBorders;
  borderRadius: TBorderRadius;
  margin: TMargin;
  padding: TPadding;
  color: TColor;
  height: THeight;
  width: TWidth;
  backdrop: TBackdrop;
};

export type ThemeConfig<
  TBaseMap extends BaseConfigMap = BaseConfigMap,
  TFlexMap extends FlexConfigMap = FlexConfigMap,
  TFlexItemMap extends FlexItemConfigMap = FlexItemConfigMap,
> = {
  base: TBaseMap;
  card?: VariantConfigMap<Partial<TBaseMap>>;
  cardHeader?: VariantConfigMap<Partial<TBaseMap>>;
  cardBody?: VariantConfigMap<Partial<TBaseMap>>;
  cardFooter?: VariantConfigMap<Partial<TBaseMap>>;
  inputText?: Partial<TBaseMap>;
  flex?: TFlexMap;
  flexItem?: TFlexItemMap;
};

export type MultiThemeConfig<TThemeConfig extends ThemeConfig = ThemeConfig> =
  Variants<TThemeConfig>;

export type UiConfig<TThemesMap extends MultiThemeConfig = MultiThemeConfig> = {
  [TKey in keyof TThemesMap]: Partial<TThemesMap[TKey]>;
} & {
  default: TThemesMap['default'];
};

export type UiConfigSeed<TThemes extends MultiThemeConfig> =
  | UiConfig<TThemes>
  | (() => UiConfig<TThemes>);

export type HeadlessProps = BaseProps;
