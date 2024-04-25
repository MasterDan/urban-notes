import { AnyMapConfig } from '../map-config';

export type FlexConfigMap<
  TDisplay extends AnyMapConfig = AnyMapConfig,
  TDirection extends AnyMapConfig = AnyMapConfig,
  TGap extends AnyMapConfig = AnyMapConfig,
  TJustifyItems extends AnyMapConfig = AnyMapConfig,
  TJustifyContent extends AnyMapConfig = AnyMapConfig,
  TAlign extends AnyMapConfig = AnyMapConfig,
> = {
  display: TDisplay;
  direction: TDirection;
  gap: TGap;
  justifyItems: TJustifyItems;
  justifyContent: TJustifyContent;
  align: TAlign;
};

export type FlexItemConfigMap<
  TGrow extends AnyMapConfig = AnyMapConfig,
  TShrink extends AnyMapConfig = AnyMapConfig,
> = {
  grow: TGrow;
  shrink: TShrink;
};
