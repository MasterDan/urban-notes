import { AnyProp } from '../prop';

export type FlexConfigMap<
  TDisplay extends AnyProp = AnyProp,
  TDirection extends AnyProp = AnyProp,
  TGap extends AnyProp = AnyProp,
  TJustifyItems extends AnyProp = AnyProp,
  TJustifyContent extends AnyProp = AnyProp,
  TAlign extends AnyProp = AnyProp,
> = {
  display: TDisplay;
  direction: TDirection;
  gap: TGap;
  justifyItems: TJustifyItems;
  justifyContent: TJustifyContent;
  align: TAlign;
};

export type FlexItemConfigMap<
  TGrow extends AnyProp = AnyProp,
  TShrink extends AnyProp = AnyProp,
> = {
  grow: TGrow;
  shrink: TShrink;
};
