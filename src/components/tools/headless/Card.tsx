import { defineComponent } from '@rexar/core';
import { AnyMultiThemeConfig, UiConfig } from './config/@types';
import { ComponentProps } from './config/multi-map-config';
import { useComponentClasses } from './config';

export function defineCard<TThemes extends AnyMultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  return defineComponent<ComponentProps<(typeof config)['default']['base']>>(
    (props) => {
      const classes$ = useComponentClasses(props, 'card');

      return <div class={classes$}>{props.children}</div>;
    },
  );
}
