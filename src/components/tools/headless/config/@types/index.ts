type AnyRecord = Record<string, unknown>;

export type ComponentConfig<
  TProps extends AnyRecord,
  TClasses extends AnyRecord,
> = { props: TProps; classes: TClasses };

export type FrameConfig = ComponentConfig<
  {
    rounded: boolean;
  },
  {
    rounded: string;
  }
>;

export type ThemeConfig = {
  frame: FrameConfig;
};

export type ComponentName = keyof ThemeConfig;

export type UiConfig<TThemes extends string> = {
  [TKey in TThemes]: Partial<ThemeConfig>;
} & { default: ThemeConfig };

export type UiConfigSeed<TThemes extends string> =
  | ThemeConfig
  | UiConfig<TThemes>
  | (() => ThemeConfig | UiConfig<TThemes>);

