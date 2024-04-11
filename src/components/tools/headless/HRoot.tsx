import { Providable, defineComponent, ref, toObservable } from '@rexar/core';
import { UiConfig } from './config/@types';
import { configProvider, themeProvider } from './config';
import { HLayers } from './HLayers';

export const HRoot = defineComponent<{
  config: UiConfig<string>;
  theme?: Providable<string>;
  content: () => JSX.Element;
}>(({ content, config, theme }) => {
  configProvider.provide(config);
  const theme$ = ref('default');
  if (theme) {
    toObservable(theme).subscribe((t) => {
      theme$.value = t;
    });
  }
  themeProvider.provide(theme$);

  return <HLayers content={content} />;
});
