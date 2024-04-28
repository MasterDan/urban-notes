import {
  ValueOrObservableOrGetter,
  defineComponent,
  ref,
  toObservable,
} from '@rexar/core';
import { Observable } from 'rxjs';
import { MultiThemeConfig, UiConfig } from './config/@types';
import { configProvider, themeProvider } from './config';
import { Layers } from './Layers';

export function defineRoot<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  return defineComponent<{
    theme?: ValueOrObservableOrGetter<keyof TThemes>;
    content: () => JSX.Element;
  }>(({ content, theme }) => {
    configProvider.provide(config);
    const theme$ = ref('default');
    if (theme) {
      theme$.fromObservable(toObservable(theme) as Observable<string>);
    }
    themeProvider.provide(theme$);

    return <Layers content={content} />;
  });
}
