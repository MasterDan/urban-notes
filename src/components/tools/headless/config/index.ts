import {
  BaseProps,
  Ref,
  ValueOrObservableOrGetter,
  computed,
  createProvider,
  ref,
  toObservable,
} from '@rexar/core';
import { combineLatestWith, map, of, switchMap } from 'rxjs';
import {
  MultiThemeConfig,
  ThemeConfig,
  UiConfig,
  UiConfigSeed,
  VariantConfigMap,
} from './@types';
import { ConfigMap, MultiMapConfig } from './multi-map-config';

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

function isVariantMap(
  m: ConfigMap | VariantConfigMap<ConfigMap>,
): m is VariantConfigMap<ConfigMap> {
  return 'default' in m;
}

export function useComponentClasses<TProps extends BaseProps>(
  props: TProps,
  key: string,
) {
  const config$ = useCurrentTheme();
  const componentType = (props as Record<string, unknown>).type as
    | ValueOrObservableOrGetter<string>
    | undefined;
  const variant$ =
    componentType == null ? of('default') : toObservable(componentType);
  const classes$ = config$.pipe(
    combineLatestWith(variant$),
    map(([c, variant]) => {
      let baseConfig = new MultiMapConfig(c.base);
      const componentConfig = c[key as keyof typeof c] as
        | ConfigMap
        | VariantConfigMap<ConfigMap>
        | undefined;
      if (componentConfig != null) {
        baseConfig = baseConfig.mergeWith(
          new MultiMapConfig(
            isVariantMap(componentConfig)
              ? componentConfig[variant]
              : componentConfig,
          ),
        );
      }

      return baseConfig;
    }),
    switchMap((c) => c.propsToClasses(props)),
  );
  return classes$;
}
