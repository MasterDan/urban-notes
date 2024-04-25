import { Ref, computed, createProvider, ref } from '@rexar/core';
import { map, switchMap } from 'rxjs';
import {
  BaseConfigMap,
  MultiThemeConfig,
  ThemeConfig,
  UiConfig,
  UiConfigSeed,
} from './@types';
import { ComponentProps, MultiMapConfig } from './multi-map-config';

export function defineConfig<TThemes extends MultiThemeConfig>(
  seed: UiConfigSeed<TThemes>,
): UiConfig<TThemes> {
  const seedObj = typeof seed === 'function' ? seed() : seed;

  return seedObj;
}

export const configProvider = createProvider<UiConfig>();

export const themeProvider = createProvider<Ref<string>>(ref('default'));

export const useCurrentTheme = () => {
  const config = configProvider.inject();
  if (config == null) {
    throw new Error('Headless config was not defined');
  }
  const theme$ = themeProvider.inject();
  return computed<ThemeConfig>(() => ({
    ...config.default,
    ...(config[theme$.value] ?? {}),
  }));
};

export function useComponentClasses<
  TProps extends ComponentProps<BaseConfigMap>,
>(props: TProps, ...keys: string[]) {
  const config$ = useCurrentTheme();
  const classes$ = config$.pipe(
    map((c) => {
      let baseConfig = new MultiMapConfig(c.base);
      (keys as (keyof typeof c)[]).forEach((key) => {
        const componentConfig = c[key] as BaseConfigMap | undefined;
        if (componentConfig != null) {
          baseConfig = baseConfig.mergeWith(
            new MultiMapConfig(componentConfig),
          );
        }
      });
      return baseConfig;
    }),
    switchMap((c) => c.propsToClasses(props)),
  );
  return classes$;
}
