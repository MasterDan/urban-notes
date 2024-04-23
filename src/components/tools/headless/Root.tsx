import {
  ValueOrObservableOrGetter,
  defineComponent,
  ref,
  toObservable,
} from '@rexar/core';
import { Observable } from 'rxjs';
import { AnyMultiThemeConfig, UiConfig } from './config/@types';
import { configProvider, themeProvider } from './config';
import { HLayers } from './HLayers';

export function defineRoot<TThemes extends AnyMultiThemeConfig>(
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

    return <HLayers content={content} />;
  });
}
