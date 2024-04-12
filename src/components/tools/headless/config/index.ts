import { Ref, computed, createProvider, ref } from '@rexar/core';
import { ThemeConfig, UiConfig, UiConfigSeed } from './@types';

export function defineConfig<TThemes extends string = 'default'>(
  seed: UiConfigSeed<TThemes>,
): UiConfig<TThemes> {
  const seedObj = typeof seed === 'function' ? seed() : seed;

  return seedObj;
}

export const configProvider = createProvider<UiConfig<string>>();

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
