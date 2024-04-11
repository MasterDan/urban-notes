import { Ref, computed, createProvider, ref } from '@rexar/core';
import { ThemeConfig, UiConfig, UiConfigSeed } from './@types';

function isThemeConfig<TThemes extends string>(
  config: ThemeConfig | UiConfig<TThemes>,
): config is ThemeConfig {
  return !('default' in config);
}

export function defineConfig<TThemes extends string = 'default'>(
  seed: UiConfigSeed<TThemes>,
): UiConfig<TThemes> {
  const seedObj = typeof seed === 'function' ? seed() : seed;
  let finalConfiguration: UiConfig<TThemes> | undefined;
  if (isThemeConfig(seedObj)) {
    finalConfiguration = {
      default: seedObj,
    } as UiConfig<TThemes>;
  } else {
    finalConfiguration = seedObj;
  }
  return finalConfiguration;
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

