import {
  Show,
  ValueOrObservableOrGetter,
  defineComponent,
  toObservable,
  useDefaultValues,
} from '@rexar/core';
import { map } from 'rxjs';
import { MultiThemeConfig, UiConfig } from './config/@types';
import { ComponentProps } from './config/multi-map-config';
import { useComponentClasses } from './config';

export type CardProps = {
  hideHeader?: ValueOrObservableOrGetter<boolean>;
  hideFooter?: ValueOrObservableOrGetter<boolean>;
  header?: JSX.Element;
  footer?: JSX.Element;
};

export function defineCard<TThemes extends MultiThemeConfig>(
  config: UiConfig<TThemes>,
) {
  const CardHeader = defineComponent((props) => {
    const classes$ = useComponentClasses(props, 'cardHeader');
    return <div class={classes$}>{props.children}</div>;
  });
  const CardBody = defineComponent((props) => {
    const classes$ = useComponentClasses(props, 'cardBody');
    return <div class={classes$}>{props.children}</div>;
  });
  const CardFooter = defineComponent((props) => {
    const classes$ = useComponentClasses(props, 'cardFooter');
    return <div class={classes$}>{props.children}</div>;
  });

  return defineComponent<
    CardProps & ComponentProps<(typeof config)['default']['base']>
  >((props) => {
    const classes$ = useComponentClasses(props, 'card');
    const { header, footer, children } = props;
    const { hideHeader, hideFooter } = useDefaultValues(props as CardProps, {
      hideHeader: () => false,
      hideFooter: () => false,
    });
    const showHeader = toObservable(hideHeader).pipe(
      map((val) => !val && header != null),
    );
    const showFooter = toObservable(hideFooter).pipe(
      map((val) => !val && footer != null),
    );
    return (
      <div class={classes$}>
        <Show
          when={showHeader}
          content={() => <CardHeader>{header}</CardHeader>}
        />
        <CardBody>{children}</CardBody>
        <Show
          when={showFooter}
          content={() => <CardFooter>{footer}</CardFooter>}
        />
      </div>
    );
  });
}
