import {
  Show,
  ValueOrObservableOrGetter,
  defineComponent,
  toObservable,
  useDefaultValues,
} from '@rexar/core';
import { combineLatestWith, map } from 'rxjs';
import { MultiThemeConfig, UiConfig } from './config/@types';
import { ComponentProps } from './config/multi-map-config';
import { useComponentClasses, useCurrentTheme } from './config';

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
  const CardBody = defineComponent<
    ComponentProps<(typeof config)['default']['base']>
  >((props) => {
    const classes$ = useComponentClasses(props, 'cardBody');
    classes$.subscribe((i) => {
      console.log('body-classes', i, props);
    });
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
    const theme$ = useCurrentTheme();
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

    const bodyRadius$ = theme$.pipe(
      map((i) => ({
        headClass: i.cardHeader?.borderRadius?.defaultValue as
          | string
          | string[],
        footerClass: i.cardFooter?.borderRadius?.defaultValue as
          | string
          | string[],
      })),
      combineLatestWith(showHeader, showFooter),
      map(([{ headClass, footerClass }, sh, sf]) => {
        const result: string[] = [];
        if (!sh && headClass) {
          if (Array.isArray(headClass)) {
            result.push(...headClass);
          } else {
            result.push(headClass);
          }
        }
        if (!sf && footerClass) {
          if (Array.isArray(footerClass)) {
            result.push(...footerClass);
          } else {
            result.push(footerClass);
          }
        }
        return result;
      }),
    );
    return (
      <div class={classes$}>
        <Show
          when={showHeader}
          content={() => <CardHeader>{header}</CardHeader>}
        />
        {/* @ts-expect-error expected */}
        <CardBody borderRadius={bodyRadius$}>{children}</CardBody>
        <Show
          when={showFooter}
          content={() => <CardFooter>{footer}</CardFooter>}
        />
      </div>
    );
  });
}
