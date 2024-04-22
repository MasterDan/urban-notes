import { Ref, computed, createProvider, ref } from '@rexar/core';
import {
  AnyMultiThemeConfig,
  AnyThemeConfig,
  AnyUiConfig,
  UiConfig,
  UiConfigSeed,
} from './@types';

export function defineConfig<TThemes extends AnyMultiThemeConfig>(
  seed: UiConfigSeed<TThemes>,
): UiConfig<TThemes> {
  const seedObj = typeof seed === 'function' ? seed() : seed;

  return seedObj;
}

export const configProvider = createProvider<AnyUiConfig>();

export const themeProvider = createProvider<Ref<string>>(ref('default'));

export const useCurrentTheme = () => {
  const config = configProvider.inject();
  if (config == null) {
    throw new Error('Headless config was not defined');
  }
  const theme$ = themeProvider.inject();
  return computed<AnyThemeConfig>(() => ({
    ...config.default,
    ...(config[theme$.value] ?? {}),
  }));
};
