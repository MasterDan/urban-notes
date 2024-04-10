import { defineComponent } from '@rexar/core';
import { UiConfig } from './config/@types';
import { configProvider, themeProvider } from './config';

export const HRoot = defineComponent<{
  config: UiConfig<string>;
  theme?: string;
  content: () => JSX.Element;
}>(({ content: Content, config, theme }) => {
  configProvider.provide(config);
  if (theme) {
    themeProvider.provide(theme);
  }

  return <Content></Content>;
});

