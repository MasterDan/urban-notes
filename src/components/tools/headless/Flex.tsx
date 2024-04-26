import { defineComponent } from '@rexar/core';
import { MultiThemeConfig, UiConfig } from './config/@types';
import { ComponentProps } from './config/multi-map-config';
import { useComponentClasses } from './config';

export function defineFlex<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  const { flex, flexItem } = config.default;
  if (flex == null) {
    throw new Error(`'flex' section of config must be defined`);
  }
  const Flex = defineComponent<
    ComponentProps<(typeof config)['default']['base']> &
      ComponentProps<typeof flex>
  >((props) => {
    const classes$ = useComponentClasses(props, 'flex');

    return <div class={classes$}>{props.children}</div>;
  });

  if (flexItem == null) {
    throw new Error(`"flexItem" section must be defined`);
  }

  const FlexItem = defineComponent<
    ComponentProps<(typeof config)['default']['base']> &
      ComponentProps<typeof flexItem>
  >((props) => {
    const classes$ = useComponentClasses(props, 'flexItem');

    return <div class={classes$}>{props.children}</div>;
  });

  return { Flex, FlexItem };
}
